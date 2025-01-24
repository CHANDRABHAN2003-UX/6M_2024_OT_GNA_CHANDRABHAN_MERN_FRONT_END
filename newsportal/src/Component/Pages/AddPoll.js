import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddPoll() {
    const [Question, setQuestion] = useState("")
    const [Image, setImage] = useState("")
    const [TotalOption, setTotalOption] = useState("")
    const [PollStatus, setPollStatus] = useState("")
    const [Options, setOptions] = useState([])
    const jsonOptions = JSON.stringify(Options);
    const changeImage = (e) => {
        console.log("file change fun call", e);
        setImage(e.target.files[0])
    }
    const handleTotalOptionChange = (e) => {
        const total = Number(e.target.value);
        setTotalOption(total);
        setOptions(Array(total).fill(""));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...Options];
        newOptions[index] = value;
        setOptions(newOptions);
    };
    
    const handleForm = (e) => {
        console.log("form handle fun");
        e.preventDefault();
        if (Options.some((option) => option.trim() === "")) {
            toast.error("All options must be filled out!");
            return;
        }
        let data = new FormData();
        data.append("pollQuestion", Question);
        data.append("image", Image);
        data.append("totalOption", TotalOption);
        data.append("pollStatus", PollStatus)
        data.append("option", jsonOptions)
        axios.post("http://localhost:5050/admin/add/poll", data, { headers: { Authorization: sessionStorage.getItem("token") } })
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
                        <h3>Add Poll</h3>
                    </div>
                    <div className="card-body">
                        <ToastContainer />
                        <form onSubmit={handleForm}>
                            <div>
                                <label htmlFor="exampleInputComment">Poll Question</label>
                                <input  type="text"className="form-control" id="exampleInputName" placeholder="Enter question" value={Question} onChange={(e) => setQuestion(e.target.value)} /> <br />
                            </div>
                            <div>
                                <label htmlFor="exampleInputComment">Poll Image</label>
                                <input  type="file"   className="form-control" id="exampleInputName" onChange={changeImage} /> <br />
                            </div>
                            <div>
                                <label htmlFor="exampleInputComment">Total Option</label>
                                <input  type="number" className="form-control" id="exampleInputName" placeholder="Enter number of options" value={TotalOption} onChange={handleTotalOptionChange} /> <br />
                            </div>
                            <div>
                                <label htmlFor="exampleInputPollStatus">Poll Status</label>
                                <select   className="form-control"  id="exampleInputPollStatus" value={PollStatus}  onChange={(e) => setPollStatus(e.target.value)} >
                                    <option value="unpublished">Unpublished</option>
                                    <option value="publish">Publish</option>
                                </select>
                                <br />
                            </div>
                            <div>
                                {Options.map((option, index) => (
                                    <div key={index}>
                                 <label>Option {index + 1}</label>
                                        <input type="text"   className="form-control" placeholder={`Enter Option ${index + 1}`} value={option}  onChange={(e) => handleOptionChange(index, e.target.value)} />  <br />
                                    </div>
                                ))}
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

