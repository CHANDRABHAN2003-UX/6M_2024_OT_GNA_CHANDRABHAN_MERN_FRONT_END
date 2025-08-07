import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Category() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:5050/viewer/category/all", {})
      .then((res) => {
        setData(res.data.data);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        console.error(err);
      });
  }, []);

  // Filter out inactive categories
  const activeCategories = data.filter((category) => category.status);

  return (
    <>
      <div className="container">
        <div className="row">
          {!load ? (
            activeCategories.length > 0 ? (
              activeCategories.map((el, index) => (
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
                      <div
                        className="card p-3 mb-3 shadow-sm"
                        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                      >
                        <h5 className="text-primary mb-2">
                          <Link
                            to={`/sinlecar?category=${el._id}`}
                            className="text-decoration-none text-dark"
                          >
                            View Cars of
                          </Link>
                        </h5>
                        <h4>{el.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-5">
                <h5>No active categories available.</h5>
              </div>
            )
          ) : (
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ height: "100vh" }}
            >
              <ClipLoader size={50} color={"#123abc"} loading={true} />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
