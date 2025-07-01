import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("token") !== null;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  return (
    <header className="bg-white shadow-sm sticky-top">
      {/* Top Info Bar */}
      <div className="bg-dark text-white py-2">
        <div className="container">
          <div className="row align-items-center">
            {/* Weather and Date */}
            <div className="col-md-6">
              <div className="d-flex justify-content-between w-100">
                <span className="d-flex align-items-center gap-2 small">
                  <i className="fas fa-sun"></i>
                  34°C, Sunny
                </span>
                <span className="d-flex align-items-center gap-2 small">
                  <i className="far fa-calendar-alt"></i>
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Spacer */}
            <div className="col-md-5 d-none d-md-block"></div>

            {/* Social Icons */}
            <div className="col-md-1 ms-5">
              <div className="d-flex justify-content-between gap-4">
                <a href="#" className="text-white small"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white small"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white small"><i className="fab fa-pinterest-p"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            {/* Logo */}
            <div className="d-flex align-items-center gap-2 col-4">
              <Link to="/" className="text-decoration-none">
                <img
                  src="/assets/img/logocar.jpg"
                  alt="Car Booking Logo"
                  className="mb-3"
                  style={{
                    height: "80px",
                    width: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ffffff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  }}
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="col-8 d-none d-md-block mx-auto">
              <nav>
                <ul className="d-flex list-unstyled mb-0 w-100 justify-content-between align-items-center">
                  <li className="flex-grow-1 text-center">
                    <Link to="/" className="text-dark text-decoration-none d-block py-2">Home</Link>
                  </li>
                  <li className="flex-grow-1 text-center">
                    <Link to="/category" className="text-dark text-decoration-none d-block py-2">Category</Link>
                  </li>
                  <li className="flex-grow-1 text-center">
                    <Link to="/cars" className="text-dark text-decoration-none d-block py-2">Cars</Link>
                  </li>

                  {isLoggedIn ? (
                    <li className="flex-grow-1 text-center">
                      <button onClick={handleLogout} className="btn btn-outline-danger btn-sm w-75">
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li className="flex-grow-1 text-center">
                        <Link to="/login" className="text-dark text-decoration-none d-block py-2">Login</Link>
                      </li>
                      <li className="flex-grow-1 text-center">
                        <Link to="/register" className="btn btn-primary btn-sm px-3 w-75">REGISTER</Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="btn btn-link text-dark d-md-none p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`bg-light py-2 d-md-none ${mobileMenuOpen ? 'd-block' : 'd-none'}`}>
        <div className="container">
          <ul className="list-unstyled mb-0">
            <li className="py-2 border-bottom">
              <Link to="/" className="text-dark text-decoration-none w-100 d-block">Home</Link>
            </li>
            <li className="py-2 border-bottom">
              <Link to="/category" className="text-dark text-decoration-none w-100 d-block">Category</Link>
            </li>
            <li className="py-2 border-bottom">
              <Link to="/news" className="text-dark text-decoration-none w-100 d-block">Cars</Link>
            </li>

            {isLoggedIn ? (
              <li className="py-2">
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm w-100">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="py-2 border-bottom mx-auto">
                  <Link to="/login" className="text-dark text-decoration-none w-100 d-block">Login</Link>
                </li>
                <li className="py-2">
                  <Link to="/register" className="btn btn-primary btn-sm w-100 d-block">REGISTER</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
