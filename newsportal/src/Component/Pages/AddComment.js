import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddComment() {
    const [Comment, setComment] = useState("");
    const [NewsId, setNewsId] = useState("")
    const [ViewerId, setViewerId] = useState("")
    useEffect(() => {
        console.log("useEffect hook call");
        axios.post("http://localhost:5050/admin/all/news", {}, { headers: { Authorization: sessionStorage.getItem("token") } })

            .then((res) => {
                console.log(res);
                setNewsId(res.data.data[0]._id);
                console.log("the news id is", res.data.data[0]._id)

            })
            .catch((err) => {
                console.log(err);

            })

    }, [])
    useEffect(() => {
        const storedViewerId = sessionStorage.getItem("viewerId");
        setViewerId(storedViewerId);
    }, []); // const handleNewsClick = (id) => {
    //     setNewsId(id);
    //     console.log("Selected News ID:", id);
    // };
   
    const handleForm = (e) => {
        console.log("form handle fun");
        e.preventDefault();
        console.log("The category Id is ", NewsId)
        let data = new URLSearchParams();
        data.append("comment", Comment);
        data.append("viewerId", ViewerId);
        data.append("newsId", NewsId);
        axios.post("http://localhost:5050/viewer/comment/add", data, { headers: { Authorization: sessionStorage.getItem("token") } })
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
                        <h3>Comment here</h3>
                    </div>
                    <div className="card-body">
                        <ToastContainer />
                        <form onSubmit={handleForm}>
                            <div>
                                <label htmlFor="exampleInputComment">Comment</label>
                                <textarea className="form-control" id="exampleInputComment" placeholder="Enter Comment" value={Comment} onChange={(e) => { setComment(e.target.value); }} rows="4"></textarea><br />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

