export default function Footer() {
    return (
      <footer className="bg-dark text-light pt-5 pb-4">
        <div className="container">
          <div className="row gy-5">
            {/* About Section */}
            <div className="col-lg-4 col-md-6 text-center  ms-5">
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
              <p className="small">
                Book your ride effortlessly. Whether it’s self-drive or with a driver, enjoy reliable and safe journeys at affordable prices.
              </p>
              <div className="ms-5 d-flex justify-content-between" style={{ width: "120px" }}>
  <a href="#"><i className="fab fa-facebook-f text-light fs-5"></i></a>
  <a href="#"><i className="fab fa-twitter text-light fs-5"></i></a>
  <a href="#"><i className="fab fa-instagram text-light fs-5"></i></a>
</div>

            </div>
  
            {/* Newsletter Section */}
            <div className=" bg-dark text-light p-4 ">
  <h5 className="mb-3 text-light">Stay Updated</h5>
  <p>Subscribe for the latest ride offers and travel tips.</p>
  <form>
    <div className="mb-3">
      <input
        type="email"
        className="form-control"
        placeholder="Enter your email"
        required
      />
    </div>
    <button className="btn btn-danger w-100" type="submit">
      SUBSCRIBE
    </button>
  </form>
</div>

  
            {/* Quick Links */}
            <div className="col-lg-4 col-md-12 text-center text-md-start mt-3">
              <h5 className="fw-bold mb-3 text-light mt-1">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Book a Ride</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Self Drive</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">With Driver</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
                <li><a href="#" className="text-light text-decoration-none">FAQs</a></li>
              </ul>
            </div>
          </div>
  
          {/* Bottom Row */}
          <div className="border-top border-secondary mt-5 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="mb-2 mb-md-0 small text-center text-md-start">
              &copy; {new Date().getFullYear()} CarBooking. All rights reserved.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-light small text-decoration-none">Terms</a>
              <a href="#" className="text-light small text-decoration-none">Privacy</a>
              <a href="#" className="text-light small text-decoration-none">Support</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  