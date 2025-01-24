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
                    <li>
                      <img src="assets/img/icon/header_icon1.png" alt="" />
                      Tuesday, 18th June, 2019
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
                  <div className="logo">
                    <Link to="/">
                      <img
                        src="/assets/img/hero/newslogo.png"
                        alt="Satyavani Logo"
                        className="img-fluid rounded-circle"
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                          border: "2px solid #ffffff",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)"
                        }}
                      />
                    </Link>
                  </div>
                </div>
                {/* Header Banner */}
                <div className="col-xl-9 col-lg-9 col-md-9 text-end">
                  <div className="header-banner">
                    <img
                      src="assets/img/hero/header_card.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Header */}
          <div className="header-bottom header-sticky py-2">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-10 col-lg-10 col-md-12">
                  {/* Main Menu */}
                  <nav className="main-menu d-flex justify-content-between">
                    <ul id="navigation" className="d-flex list-unstyled gap-4 mb-0">
                      <li>
                        <Link to="/admin">Home</Link>
                      </li>
                      <li className="dropdown">
                        <Link
                          to="/admin/category"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          Category
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
                      <li className="dropdown">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          News
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/admin/addnews" className="dropdown-item">
                              Add News
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/managenews" className="dropdown-item">
                              Manage News
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          Poll
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/admin/addpoll" className="dropdown-item">
                              Add Poll
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/managepoll" className="dropdown-item">
                              Manage poll
                            </Link>
                          </li>
                        </ul>
                      </li>

                      {isLoggedIn && (
                        <a onClick={logout} className="btn btn-primary  px-3 d-none d-sm-block mx-auto mt-3 ">
                          Logout <i className="fa fa-arrow-right ms-3" />
                        </a>
                      )}
                    </ul>
                  </nav>
                </div>

                {/* Search Box */}
                <div className="col-xl-2 col-lg-2 col-md-12 text-end">
                  <div className="header-right-btn d-inline-block">
                    <i className="fas fa-search special-tag me-2" />
                    <div className="search-box d-inline-block">
                      <form action="#">
                        <input
                          type="text"
                          placeholder="Search"
                          className="form-control"
                        />
                      </form>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="col-12 d-block d-md-none mt-3">
                  <div className="mobile_menu" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}
    </header>
  );
}
