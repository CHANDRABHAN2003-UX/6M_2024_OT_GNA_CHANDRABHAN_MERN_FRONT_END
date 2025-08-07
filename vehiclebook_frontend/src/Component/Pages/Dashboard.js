import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState({}); // State for storing object data

  useEffect(() => {
    console.log("useEffect hook call");
    axios
      .post(
        "http://localhost:5050/admin/dashboard",
        {},
        { headers: { Authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        console.log(res);
        setData(res.data.data); 
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Dashboard</h2>
      {Object.keys(data).length === 0 ? (
        <p className="text-center w-100">No data available</p>
      ) : (
        <div className="row justify-content-center">
          {/* Viewer Card */}
          <div className="col-md-3 mb-4 d-flex justify-content-center">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <i
                className="fas fa-eye mb-3"
                style={{ fontSize: "50px", color: "#17a2b8" }}
              ></i>
              <h5 className="card-title">Viewer</h5>
              <p className="card-text" style={{ fontSize: "20px", fontWeight: "bold" }}>
                {data.totalViewer}
              </p>
            </div>
          </div>

          {/* News Card */}
          <div className="col-md-3 mb-4 d-flex justify-content-center">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <i
                className="fas fa-newspaper mb-3"
                style={{ fontSize: "50px", color: "#28a745" }}
              ></i>
              <h5 className="card-title">Car</h5>
              <p className="card-text" style={{ fontSize: "20px", fontWeight: "bold" }}>
                {data.totalNews}
              </p>
            </div>
          </div>

          {/* Category Card */}
          <div className="col-md-3 mb-4 d-flex justify-content-center">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <i
                className="fas fa-th mb-3"
                style={{ fontSize: "50px", color: "#ffc107" }}
              ></i>
              <h5 className="card-title">Category</h5>
              <p className="card-text" style={{ fontSize: "20px", fontWeight: "bold" }}>
                {data.totalCategory}
              </p>
            </div>
          </div>

          {/* Comment Card */}
          <div className="col-md-3 mb-4 d-flex justify-content-center">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease-in-out",
              }}
            >
             <i className="fas fa-list-alt mb-3" style={{ fontSize: "50px", color: "#dc3545" }}></i>

              <h5 className="card-title">Booking</h5>
              <p className="card-text" style={{ fontSize: "20px", fontWeight: "bold" }}>
                {data.totalBooking}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
