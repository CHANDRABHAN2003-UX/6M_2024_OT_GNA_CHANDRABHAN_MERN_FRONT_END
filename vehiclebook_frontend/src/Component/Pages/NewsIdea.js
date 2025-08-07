import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for Toastify

export default function NewsIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ViewerId, setViewerId] = useState("");
  
  const navigate = useNavigate();

  const handletitleChange = (e) => setTitle(e.target.value);
  const handledescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
   useEffect(() => {
          const storedViewerId = sessionStorage.getItem("viewerId");
          setViewerId(storedViewerId);
      }, []);



  const handleFormSubmit = (e) => {
    e.preventDefault();
  
   
    let data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);
    data.append("viewerId", ViewerId);

    axios
      .post("http://localhost:5050/viewer/newsIdea/add", data,{headers:{Authorization:sessionStorage.getItem("token")}})
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login"); // Redirect to login after successful registration
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
  };
  
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>NewsIdea
        
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handletitleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={handledescriptionChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="file"
            placeholder="Image or Video"
            onChange={handleImageChange}
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
          Submit
        </button>
      </form>
      <ToastContainer theme="light" />
    </div>
  );
}
