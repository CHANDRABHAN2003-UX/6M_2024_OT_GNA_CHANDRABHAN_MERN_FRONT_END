import axios from "axios";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link} from "react-router-dom";
import { ClipLoader } from "react-spinners";
export default function ManageCategory() {
    var [data, setData] = useState([]);
    var[load,setLoad] = useState(true)
    useEffect(() => {
        console.log("useEffect hook call");
        axios.post("http://localhost:5050/admin/all/category",{},{
            headers: { Authorization: sessionStorage.getItem("token") },
          })
            .then((res) => {
                console.log(res);
                setData(res.data.data);
                setLoad(false)
              
            })
            .catch((err) => {
              setLoad(false)
                console.log(err);

            })

    }, [load])
    const changeStatusFalse = (_id)=>{
        console.log("soft false delete call",_id);
        let data = new FormData()
        data.append("_id",_id)
        data.append("status",false)
        axios.post("http://localhost:5050/admin/update/category",data,{headers:{Authorization:sessionStorage.getItem("token")}})
        .then((res)=>{
            console.log(res);
            if(res.data.success){
              setLoad(true)
              toast.success(res.data.message)
            }
            else{
              toast.error(res.data.message)
            }
            
        })
        .catch((err)=>{
            console.log(err);
            setLoad(false)
        }
          
        )
        
      }
      const changeStatusTrue = (_id)=>{
        console.log("soft true delete call",_id);
        let data = new FormData()
        data.append("_id",_id)
        data.append("status",true)
        axios.post("http://localhost:5050/admin/update/category",data,{headers:{Authorization:sessionStorage.getItem("token")}})
        .then((res)=>{
            console.log(res);
            if(res.data.success){
              setLoad(true)
              toast.success(res.data.message)
            }
            else{
              toast.error(res.data.message)
              setLoad(false)
            }
            
        })
        .catch((err)=>{
          toast.error("Something went wrong!!")
            console.log(err);
            
        })
      }
  let obj ={

  }
      
  return (
    <>
        <div className="container">
                <div className="row">
                <ClipLoader color="red" cssOverride={obj} loading={load} size={100}/>
                    <div className="col">
                {
                  !load?
                        <table style={{ border: "2px solid green" }}>
                            <tr className="ms-3">
                                <td style={{ border: "2px solid green" }}>sr no</td>
                                <td style={{ border: "2px solid green" }}>Category Name</td>
                                <td style={{ border: "2px solid green" }}>Image</td>
                                <td style={{ border: "2px solid green" }}>Action</td>
                                <td style={{ border: "2px solid green" }}>Status</td>
                            </tr>

                            {
                                data.map((el, index) => (
                                    <tr>
                                        <td style={{ border: "2px solid green" }}>{index + 1}</td>
                                        <td style={{ border: "2px solid green" }}>{el.name}</td>
                                        <td style={{ border: "2px solid green" }}><img src={"http://localhost:5050/"+el.image} style={{ height: "100px", width: "100px" }} /></td>
                                        <td style={{ border: "2px solid green" }}><Link to={"/admin/updatecategory/"+el._id} className="btn btn-primary">Edit</Link>
                                        </td>
                                     <td>  {el.status?<Link className="btn btn-danger" style={{backgroundColor:"red"}}  onClick={()=>{changeStatusFalse(el?._id)}}>Inactive</Link>:<Link className="btn btn-success"  style={{backgroundColor:"green"}} onClick={()=>{changeStatusTrue(el?._id)}}>Active</Link>}</td> 
                                    </tr>
                                ))
                            }

                        </table>:""
                }
                    </div>
                </div>
            </div>
      <ToastContainer />
    </>
  );
}

