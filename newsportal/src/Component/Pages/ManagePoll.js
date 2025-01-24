import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react"
export default function ManagePoll() {
    var [data1, setData] = useState([]);
    var [data2, setData1] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    var[load,setLoad] = useState(true)
    useEffect(() => {
        console.log("useEffect hook call");
        axios.post("http://localhost:5050/admin/all/poll", {}, { headers: { Authorization: sessionStorage.getItem("token") } })
            .then((res) => {
                console.log(res);
                setData(res.data.data);
                setLoad(false)

            })
            .catch((err) => {
                console.log(err);
                setLoad(false)

            })

    }, [load])
    useEffect(() => {
        console.log("useEffect hook call");
        axios.post("http://localhost:5050/admin/all/pollOption", {}, { headers: { Authorization: sessionStorage.getItem("token") } })
            .then((res) => {
                console.log(res.data.data);
                setData1(res.data.data);
                

            })
            .catch((err) => {
                console.log(err);

            })

    }, [])
    const changeStatusFalse = (_id)=>{
        console.log("soft false delete call",_id);
        let data = new FormData()
        data.append("_id",_id)
        data.append("status",false)
        axios.post("http://localhost:5050/admin/update/poll",data,{headers:{Authorization:sessionStorage.getItem("token")}})
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
        axios.post("http://localhost:5050/admin/update/poll",data,{headers:{Authorization:sessionStorage.getItem("token")}})
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

    return (
        <>
            <div className="container">
                <div className="row">
                    <ClipLoader color="red" loading={load} size={100}/>
                    <div className="col">
                    { !load?
                        <table style={{ border: "2px solid green" }}>
                            <tr className="ms-3">
                                <td style={{ border: "2px solid green" }}>Sr no</td>
                                <td style={{ border: "2px solid green" }}>pollQuestion</td>
                                <td style={{ border: "2px solid green" }}>Image</td>
                                <td style={{ border: "2px solid green" }}>TotalOption</td>
                                <td style={{ border: "2px solid green" }}>PollStatus</td>
                                <td style={{ border: "2px solid green" }}>Action</td>
                                <td style={{ border: "2px solid green" }}>Option Value</td>
                                <td style={{ border: "2px solid green" }}>Status</td>
                            </tr>

                            {
                                data1?.map((el, index) => (

                                    <tr>
                                        <td style={{ border: "2px solid green" }}>{index + 1}</td>
                                        <td style={{ border: "2px solid green" }}>{el.pollQuestion}</td>
                                        <td style={{ border: "2px solid green" }}><img src={"http://localhost:5050/" + el.image} style={{ height: "100px", width: "100px" }} /></td>
                                        <td style={{ border: "2px solid green" }}>{el.totalOption}</td>
                                        <td style={{ border: "2px solid green" }}>{el.pollStatus}</td>
                                        <td style={{ border: "2px solid green" }}><Link to={"/updatepoll/" + el._id} className="btn btn-primary">Edit</Link></td>
                                        <td style={{ border: "2px solid green" }}>
                                            {(() => {
                                                const options = data2.filter((x) => x.pollId._id === el._id); // Proper declaration
                                                return (
                                                    <>
                                                        {/* Eye Icon */}
                                                        <button
                                                            style={{ cursor: "pointer", background: "none", border: "none", color: "blue" }}
                                                            onClick={() => setShowOptions((prev) => !prev)} // Toggle options visibility
                                                        >
                                                            👁️
                                                        </button>
                                                        {showOptions && (
                                                            <div
                                                                style={{
                                                                    marginTop: "10px",
                                                                    border: "1px solid #ccc",
                                                                    padding: "10px",
                                                                    borderRadius: "5px",
                                                                }}
                                                            >
                                                                <strong>Options:</strong>
                                                                <ul style={{ margin: 0, padding: "5px 0" }}>
                                                                    {options.map((opt, idx) => (
                                                                        <li
                                                                            key={idx}
                                                                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                                                                        >
                                                                            {opt.option}
                                                                            <Link
                                                                                to={"/admin/updatepolloption/"+opt._id} 
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                    textDecoration: "none",
                                                                                    marginLeft: "10px",
                                                                                    color: "blue",
                                                                                }}
                                                                            >
                                                                                ✏️
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                    </>
                                                );
                                            })()}
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