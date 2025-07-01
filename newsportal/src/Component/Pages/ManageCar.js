import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react"
export default function ManageCar() {
    var [data1, setData] = useState([]);
    var[load,setLoad] = useState(true)
    useEffect(() => {
        console.log("useEffect hook call");
        axios.post("http://localhost:5050/admin/all/news",{},{headers:{Authorization:sessionStorage.getItem("token")}})
            .then((res) => {
                console.log(res);
                setData(res.data.data);
                setLoad(false)

            })
            .catch((err) => {
                console.log(err);

            })

    }, [load])
    // useEffect(() => {
    //     console.log("useEffect hook call");
    //     axios.post("https://kizaapi.ksesystem.com/api/category/all")
    //         .then((res) => {
    //             console.log(res);
    //             setData2(res.data.data);
              
    //         })
    //         .catch((err) => {
    //             console.log(err);

    //         })

    // }, [])
    const changeStatusFalse = (_id)=>{
        console.log("soft false delete call",_id);
        let data = new FormData()
        data.append("_id",_id)
        data.append("status",false)
        axios.post("http://localhost:5050/admin/update/news",data,{headers:{Authorization:sessionStorage.getItem("token")}})
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
        axios.post("http://localhost:5050/admin/update/news",data,{headers:{Authorization:sessionStorage.getItem("token")}})
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
                  { !load?
                        <table style={{ border: "2px solid green" }}>
                            <tr className="ms-3">
                                <td style={{ border: "2px solid green" }}>Sr no</td>
                                <td style={{ border: "2px solid green" }}>CategoryName</td>
                                <td style={{ border: "2px solid green" }}>Title</td>
                                <td style={{ border: "2px solid green" }}>Model</td>
                                <td style={{ border: "2px solid green" }}>Seating Capacity</td>
                                <td style={{ border: "2px solid green" }}>Price Per km</td>
                                <td style={{ border: "2px solid green" }}>Image Or Video</td>
                                <td style={{ border: "2px solid green" }}>Action</td>
                                <td style={{ border: "2px solid green" }}>Status</td>
                            </tr>

                            {
                                data1?.map((el, index) => (
                                    <tr>
                                        <td style={{ border: "2px solid green" }}>{index + 1}</td>
                                        <td style={{ border: "2px solid green" }}>{el.categoryId?.name}</td>
                                        <td style={{ border: "2px solid green" }}>{el.title}</td>
                                        <td style={{ border: "2px solid green" }}>{el.model}</td>
                                        <td style={{ border: "2px solid green" }}>{el.seatingCapacity}</td>
                                         <td style={{ border: "2px solid green" }}>{el.pricePerKm}</td>
                                        <td style={{ border: "2px solid green" }}><img src={"http://localhost:5050/" + el.image} style={{ height: "100px", width: "100px" }} /></td>
                                        <td style={{ border: "2px solid green" }}><Link to={"/admin/updatenews/"+el._id} className="btn btn-primary">Edit</Link>
                                       
                                        </td>
                                        <td>  {el.status?<Link className="btn btn-danger" style={{backgroundColor:"red"}}  onClick={()=>{changeStatusFalse(el?._id)}}>Inactive</Link>:<Link className="btn btn-success"  style={{backgroundColor:"green"}} onClick={()=>{changeStatusTrue(el?._id)}}>Active</Link>}</td> 
                                    </tr>
                                ))
                            }

                        </table>:""}
                    </div>
                </div>
            </div>

        </>
    )
}