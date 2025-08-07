import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";

export default function SinleCar() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category"); // expected to be categoryId._id

useEffect(() => {
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5050/viewer/news/all",
        {},
        {
          headers: { Authorization: sessionStorage.getItem("token") },
        }
      );

      let filteredNews = response.data.data;

      // Filter by category ID if selected
      if (selectedCategory) {
        filteredNews = filteredNews.filter(
          item => item.categoryId && item.categoryId._id === selectedCategory
        );
      }

      // Filter out items with status === false
      filteredNews = filteredNews.filter(item => item.status !== false);

      setNewsData(filteredNews);
    } catch (err) {
      setError(err.message || "Failed to fetch news");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, [selectedCategory]);


  const handleSelfDriveClick = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login?redirect=booking");
    } else {
      navigate("/booking");
    }
  };

  const handleWithDriverClick = () => {
    navigate("/booking");
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <ClipLoader color="#36d7b7" loading={loading} size={100} />
        <p>Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {newsData.length > 0 ? (
          newsData.map((newsItem) => (
            <div className="col-md-4 mb-4" key={newsItem._id}>
              <div className="card shadow" style={{ border: "2px solid green" }}>
                <img
                  src={`http://localhost:5050/${newsItem.image}`}
                  className="card-img-top"
                  alt={newsItem.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{newsItem.title}</h5>
                  <p className="card-text">
                    <strong>Model:</strong> {newsItem.model}<br />
                    <strong>Seating:</strong> {newsItem.seatingCapacity}
                  </p>

                  <button
                    className="btn btn-primary mb-2 w-100"
                    onClick={() =>
                      setSelectedNewsId(
                        selectedNewsId === newsItem._id ? null : newsItem._id
                      )
                    }
                  >
                    {selectedNewsId === newsItem._id
                      ? "Hide Options"
                      : "Book Trip"}
                  </button>

                  {selectedNewsId === newsItem._id && (
                    <div className="mt-3">
                      <h6 className="mb-3">Select Booking Option:</h6>
                      <div className="d-flex justify-content-between gap-3">
                        <div
                          className="p-3 rounded shadow-sm bg-light text-center flex-fill option-card"
                          style={{
                            cursor: "pointer",
                            border: "2px solid #198754",
                          }}
                          onClick={handleSelfDriveClick}
                        >
                          <i className="fa fa-car fa-2x mb-2 text-success"></i>
                          <h6 className="mb-0">With Self Drive</h6>
                        </div>

                        <div
                          className="p-3 rounded shadow-sm bg-light text-center flex-fill option-card"
                          style={{
                            cursor: "pointer",
                            border: "2px solid #0d6efd",
                          }}
                          onClick={handleWithDriverClick}
                        >
                          <i className="fa fa-user fa-2x mb-2 text-primary"></i>
                          <h6 className="mb-0">With Driver</h6>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-danger mt-5">
            <h5>
              No cars found {selectedCategory ? `for category: ${selectedCategory}` : ""}
            </h5>
          </div>
        )}
      </div>

      <style jsx>{`
        .option-card {
          transition: all 0.3s ease-in-out;
        }
        .option-card:hover {
          transform: scale(1.05);
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
}
