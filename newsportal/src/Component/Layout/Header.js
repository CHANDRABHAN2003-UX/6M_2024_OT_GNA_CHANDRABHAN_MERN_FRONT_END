import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [loading, setLoading] = useState(false); // Add a state for loading spinner
  const nav = useNavigate();

  // Check if the user is logged in by checking sessionStorage for an auth token
  const isLoggedIn = sessionStorage.getItem("token") !== null;

  const logout = () => {
    console.log("Logout function triggered");

    if (window.confirm("Do you really want to logout?")) {
      setLoading(true); // Show loading spinner
      try {
        sessionStorage.clear(); // Clear all session storage items
        console.log("Session storage cleared");
        toast.success("Logout successfully");
        nav("/login"); // Redirect to login page
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("An error occurred during logout.");
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }
  };

  useEffect(() => {
    // Optional: Check for session storage or token on component mount to update logged-in state
    const token = sessionStorage.getItem("token");
    if (!token) {
      nav("/login"); // If no token, redirect to login page
    }
  }, [nav]);
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  return (
    <header>
      {/* Header Start */}
      <div className="header-area">
        <div className="main-header">
          {/* Top Header */}
          <div className="header-top black-bg d-none d-md-block">
            <div className="container">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="header-info-left col-md-6 d-flex justify-content-start align-items-center">
                  <ul className="d-flex list-unstyled">
                    <li className="me-4">
                      <img src="assets/img/icon/header_icon1.png" alt="" />
                      34ºc, Sunny
                    </li>
                    <li className="me-4">
                      <img src="assets/img/icon/header_icon1.png" alt="" />
                       {formattedDate}
                    </li>
                  </ul>
                </div>
                <div className="header-info-right col-md-6 d-flex justify-content-end">
                  <ul className="header-social list-unstyled d-flex gap-3 mb-0">
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-pinterest-p" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {loading && ( // Conditionally render spinner when loading is true
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999, // Ensure it's on top of other elements
              }}
            >
              <ClipLoader
                size={50}
                color="#A97142" // Spinner color
                loading={loading}
              />
            </div>
          )}

          {/* Mid Header */}
          <div className="header-mid d-none d-md-block py-3">
            <div className="container">
              <div className="row align-items-center">
                {/* Logo */}
                <div className="col-xl-3 col-lg-3 col-md-3 text-center">
                 
                </div>
                {/* Header Banner */}
              </div>
            </div>
          </div>

          {/* Bottom Header */}
         {/* Bottom Header */}
<div className="header-bottom header-sticky py-2 bg-white shadow-sm">
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light">
      {/* Logo */}
      <Link to="/admin" className="navbar-brand d-flex align-items-center">
        <img
          src="/assets/img/logocar.jpg"
          alt="car Logo"
          className="img-fluid rounded-circle"
          style={{
            height: "60px",
            width: "60px",
            objectFit: "cover",
            border: "2px solid #ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)"
          }}
        />
      </Link>

      {/* Toggle button for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center gap-lg-4">
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Home
            </Link>
          </li>

          {/* Car Category Dropdown */}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              Car Category
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/admin/addcategory" className="dropdown-item">
                  Add Category
                </Link>
              </li>
              <li>
                <Link to="/admin/managecategory" className="dropdown-item">
                  Manage Category
                </Link>
              </li>
            </ul>
          </li>

          {/* Car Dropdown */}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              Car
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/admin/addnews" className="dropdown-item">
                  Add Car
                </Link>
              </li>
              <li>
                <Link to="/admin/managenews" className="dropdown-item">
                  Manage Car
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/admin/bookingList" className="nav-link">
              Bookings
            </Link>
          </li>

          {/* Logout Button */}
          {isLoggedIn && (
            <li className="nav-item">
              <button
                onClick={logout}
                className="btn btn-outline-danger ms-lg-3 mt-2 mt-lg-0"
              >
                Logout <i className="fa fa-arrow-right ms-2" />
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  </div>
</div>

        </div>
      </div>
      {/* Header End */}
    </header>
  );
}
