import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateNews() {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Image, setImage] = useState("");
   const [categoryId,setCategoryId]=useState("")
    var [data1, setData] = useState([]);
    const changeImage = (e) => {
        console.log("file change fun call", e);
        setImage(e.target.files[0])
     }
  const params=useParams()
  console.log("params",params.id)
  const id=params.id
  useEffect(()=>{
    axios.post("http://localhost:5050/admin/single/news",{_id:id},{headers:{Authorization:sessionStorage.getItem("token")}})
    .then((res)=>{
            console.log(res);
            setTitle(res.data?.data?.title)
            setDescription(res.data.data.description)
            setImage(res.data.data.image)
            setCategoryId(res.data.data?.categoryId?._id)
            
    })
    .catch((err)=>{
        console.log(err);
        
    })
},[])

useEffect(() => {
    console.log("useEffect hook call");
    axios.post("http://localhost:5050/admin/all/category",{},{headers:{Authorization:sessionStorage.getItem("token")}})
        .then((res) => {
            console.log(res);
            setData(res.data.data);
           

        })
        .catch((err) => {
            console.log(err);

        })

}, [])
const handleForm = (e) => {
    console.log("form handle fun");
    e.preventDefault();

    console.log("The category Id is ", categoryId)
    let data = new FormData()
    data.append("_id",id)
    data.append("title",Title)
    data.append("description",Description)
    data.append("image", Image)
    data.append("categoryId", categoryId)
    axios.post("http://localhost:5050/admin/update/news", data, { headers: { Authorization: sessionStorage.getItem("token") } })
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
                        <h3>Manage News</h3>
                    </div>

                    <div className="card-body">
                        <ToastContainer />
                        <form onSubmit={handleForm}>
                        <img src={"http://localhost:5050/"+Image} height={"100px"} width={"100px"} className="mx-auto"></img>
                            <div className="form-group mb-3">
                                <label htmlFor="categorySelect">Select Category</label>
                                {/* <select id="categorySelect" className="form-control" onChange={setCategoryId((e)=>(e.target.value))}> */}
                                <select id="categorySelect" className="form-control" value={categoryId} onChange={
                                    (e)=>{
                                        setCategoryId(e.target.value)
                                    }
                                }>
                                    {data1?.map((el, index) => (
                                        <option key={index} value={el._id}>{el.name}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputName">Title</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Title" value={Title} onChange={(e) => { setTitle(e.target.value); }} /><br />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputName">Description</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Description" value={Description} onChange={(e) => { setDescription(e.target.value); }} /><br />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputImage">Image or Video</label>
                                <input type="file" className="form-control" id="exampleInputImage" placeholder="Image or Video" onChange={changeImage} />
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
