import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
export default function Category() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .post(
        "http://localhost:5050/viewer/category/all",
        {},
       
      )
      .then((res) => {
        setData(res.data.data);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        console.error(err);
      });
  }, [load]);

  return (
    <>
     <div className="container">
  <div className="row">
    {!load ? (
      data.map((el, index) => (
        <div className="col-lg-6 col-md-6" key={index}>
          <div className="single-what-news mb-100">
            <div className="what-img">
              <img
                src={`http://localhost:5050/${el.image}`}
                alt={el.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
            </div>
            <div className="what-cap">
              <span className="color1"></span> {/* Customize category name here */}
              <h4>
                <Link to="/news">{el.name}</Link>
              </h4>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "100vh" }}>
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    )}
  </div>
</div>

      <ToastContainer />
    </>
  );
}
