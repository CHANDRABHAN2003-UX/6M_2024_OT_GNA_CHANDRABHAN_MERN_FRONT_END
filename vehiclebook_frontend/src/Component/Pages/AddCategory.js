import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", categoryName);
    data.append("image", categoryImage);

    axios
      .post("http://localhost:5050/admin/add/category", data, {
        headers: { Authorization: sessionStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);

        // Reset form fields
        setCategoryName("");
        setCategoryImage(null);

        // Optionally clear the file input field manually
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: "15px" }}>
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
          Add Category
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
