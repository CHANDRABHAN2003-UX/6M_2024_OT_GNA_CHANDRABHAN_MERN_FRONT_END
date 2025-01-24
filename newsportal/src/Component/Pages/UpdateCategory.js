import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function UpdateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const params=useParams()
  console.log("params",params.id)
  const id=params.id
  useEffect(()=>{
      axios.post("http://localhost:5050/admin/single/category",{_id:id},{headers:{Authorization:sessionStorage.getItem("token")}})
      .then((res)=>{
              console.log(res);
              setCategoryName(res.data?.data?.name)
              setCategoryImage(res.data.data.image)
              
              
      })
      .catch((err)=>{
          console.log(err);
          
      })
  },[])
  const handleFormSubmit = (e) => {
    console.log("form handle fun");
    e.preventDefault();
    let data = new FormData()
    data.append("_id",id)
    data.append("name", categoryName)
    data.append("image", categoryImage)
    axios.post("http://localhost:5050/admin/update/category", data, { headers: { Authorization: sessionStorage.getItem("token") } })
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
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: "15px" }}>
        <img src={"http://localhost:5050/"+categoryImage} height={"100px"} width={"100px"} className="mx-auto"></img>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={handleCategoryNameChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleCategoryImageChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Category
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
