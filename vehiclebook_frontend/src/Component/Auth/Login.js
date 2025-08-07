import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from query (e.g., /login?redirect=booking)
  const redirectPath = new URLSearchParams(location.search).get("redirect");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateForm = () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = { email, password };

    axios
      .post("http://localhost:5050/admin/login", data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);

          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("viewerId", res.data.data.viewerId);
          sessionStorage.setItem("userType", res.data.data.userType);

          const userType = res.data.data.userType;

          if (userType === 1) {
            navigate("/admin");
          } else {
            // Redirect to redirectPath or booking if userType is not admin
            navigate(`/${redirectPath || "booking"}`);
          }
        } else {
          toast.error(res.data.message);
          setTimeout(() => {
            navigate("/register");
          }, 1500); // Delay redirect to allow toast to show
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
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
          Login
        </button>
      </form>
      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#007bff" }}>
          Register here
        </Link>.
      </p>
      <ToastContainer theme="light" />
    </div>
  );
}
