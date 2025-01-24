import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function UpdatePollOption() {
    const [Option, setOption] = useState("")
    const [Question, setQuestion] = useState("")
   
    const params = useParams()
    console.log("params", params.id)
    const id = params.id
   
    useEffect(() => {
        axios.post("http://localhost:5050/admin/single/pollOption", { _id: id }, { headers: { Authorization: sessionStorage.getItem("token") } })
            .then((res) => {
                console.log(res);
                setOption(res.data.data.option);
                setQuestion(res.data?.data?.pollId?.pollQuestion );


            })
            .catch((err) => {
                console.log(err);

            })
    }, [])
    // useEffect(() => {
    //     console.log("useEffect hook call");
    //     axios.post("http://localhost:5050/admin/all/polls", {}, { headers: { Authorization: sessionStorage.getItem("token") } })
    //         .then((res) => {
    //             console.log(res.data.data);
                
    //             // setLoad(false)

    //         })
    //         .catch((err) => {
    //             console.log(err);

    //         })

    // }, [])

    const handleForm = (e) => {
        console.log("form handle fun");
        e.preventDefault();
    
        let data = new URLSearchParams();
        data.append("_id",id)
        data.append("option", Option);
axios.post("http://localhost:5050/admin/update/pollOption", data, { headers: { Authorization: sessionStorage.getItem("token") } })
            .then((res) => {
                console.log(res);
                toast.success(res.data.message)

            })
            .catch(err => {
                console.log(err);

            })
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg" style={{ width: "400px" }}>
                    <div className="card-header text-center bg-primary text-white">
                        <h3>Update Option</h3>
                    </div>
                    <div className="card-body">
                        <ToastContainer />
                        <form onSubmit={handleForm}>
                        <div>
                                <label htmlFor="exampleInputComment">Poll Question</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter question" value={Question} onChange={(e) => setQuestion(e.target.value)} /> <br />
                            </div>
                        <div>
                                <label htmlFor="exampleInputComment">Update Option</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="options!" value={Option} onChange={(e) => setOption(e.target.value)} /> <br />
                            </div>
                           
                           
                            <button type="submit" className="btn btn-primary w-100">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

