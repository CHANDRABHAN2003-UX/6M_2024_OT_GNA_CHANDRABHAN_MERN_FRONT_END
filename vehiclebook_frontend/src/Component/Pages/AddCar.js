import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddCar() {
    const [Title, setTitle] = useState("");
    const [Model, setModel] = useState("");
    const [SeatingCapacity, setSeatingCapacity] = useState("");
    const [PricePerKm, setPricePerKm] = useState("");
    const [Image, setImage] = useState("");
   const [CategoryId,setCategoryId]=useState("")
    var [data1, setData] = useState([]);
    const changeImage = (e) => {
        console.log("file change fun call", e);
        setImage(e.target.files[0])
     }
 
 useEffect(() => {
        console.log("useEffect hook call");
        axios.post("http://localhost:5050/admin/all/category",{}, {headers: { Authorization: sessionStorage.getItem("token") }})
      
            .then((res) => {
                console.log(res);
                setData(res.data.data);
              
            })
            .catch((err) => {
                console.log(err);

            })

    }, [])
//   useEffect(() => {
//         console.log("useEffect hook call");
//         axios.post("https://kizaapi.ksesystem.com/api/subcategory/all")
//             .then((res) => {
//                 console.log(res);
//                 setData(res.data.data);
              

//             })
//             .catch((err) => {
//                 console.log(err);

//             })

//     }, [])
    const handleForm = (e) => {
        console.log("form handle fun");
        e.preventDefault();

        console.log("The category Id is ", CategoryId)
        let data = new FormData()
        data.append("title", Title)
        data.append("model", Model);
        data.append("seatingCapacity", SeatingCapacity)
         data.append("pricePerKm",PricePerKm)
        data.append("image",Image)
        data.append("categoryId", CategoryId)
        axios.post("http://localhost:5050/admin/add/news", data, { headers: { Authorization: sessionStorage.getItem("token") } })
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
                        <h3>Add Vehicle</h3>
                    </div>

                    <div className="card-body">
                        <ToastContainer />
                        <form onSubmit={handleForm}>
                            <div className="form-group mb-3">
                                <label htmlFor="categorySelect">Select Category</label>
                                {/* <select id="categorySelect" className="form-control" onChange={setCategoryId((e)=>(e.target.value))}> */}
                                <select id="categorySelect" className="form-control" onChange={
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
                                <label htmlFor="exampleInputName">Model</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Model" value={Model} onChange={(e) => { setModel(e.target.value); }} /><br />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputName">Seating Capacity</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Seats" value={SeatingCapacity} onChange={(e) => { setSeatingCapacity(e.target.value); }} /><br />
                            </div>
                             <div className="form-group mb-3">
                                <label htmlFor="exampleInputName">Price Per Km</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Price" value={PricePerKm} onChange={(e) => { setPricePerKm(e.target.value); }} /><br />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputImage">Image or Video</label>
                                <input type="file" className="form-control" id="exampleInputImage" placeholder="Image or Video" onChange={changeImage} />
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
