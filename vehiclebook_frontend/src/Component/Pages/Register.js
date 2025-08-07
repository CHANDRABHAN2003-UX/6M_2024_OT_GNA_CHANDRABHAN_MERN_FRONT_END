import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for Toastify

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleContactChange = (e) => setContact(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateForm = () => {
    if (!name || !email || !contact || !gender || !password) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let data = {
      name: name,
      email: email,
      contact: contact,
      gender: gender,
      password: password,
    };

    axios
      .post("http://localhost:5050/admin/register", data)
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
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={handleContactChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <select
            value={gender}
            onChange={handleGenderChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            required
          />
        </div>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
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
          Register
        </button>
      </form>
      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Already have an account? <Link to="/login" style={{ color: "#007bff" }}>Login here</Link>.
      </p>
      <ToastContainer theme="light" />
    </div>
  );
}
