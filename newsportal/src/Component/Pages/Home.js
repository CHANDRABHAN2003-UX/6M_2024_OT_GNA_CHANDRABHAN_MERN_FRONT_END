import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Drive Your Dream Car Today</h1>
          <p className="lead">Affordable, fast, and reliable car rentals</p>

          {/* Booking Options in Hero */}
          <div className="d-flex justify-content-center gap-4 mx-auto flex-wrap">
            <div
              className="p-3 rounded bg-light text-dark option-card"
              style={{ cursor: "pointer", border: "2px solid #198754", minWidth: 180 }}
              onClick={handleSelfDriveClick}
            >
              <i className="fa fa-car fa-2x mb-2 text-success"></i>
              <h6 className="mb-0">With Self Drive</h6>
            </div>

            <div
              className="p-3 rounded bg-light text-dark option-card ms-3"
              style={{ cursor: "pointer", border: "2px solid #0d6efd", minWidth: 180 }}
              onClick={handleWithDriverClick}
            >
              <i className="fa fa-user fa-2x mb-2 text-primary"></i>
              <h6 className="mb-0">With Driver</h6>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">Our Services</h2>
          <div className="row">
            {[
              { icon: "fa-car", title: "Self Drive" },
              { icon: "fa-user", title: "With Driver" },
              { icon: "fa-clock", title: "24/7 Support" },
            ].map((service, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <i className={`fa ${service.icon} fa-3x text-primary mb-3`}></i>
                <h5>{service.title}</h5>
                <p>Reliable and convenient car booking tailored to your needs.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose Us?</h2>
          <div className="row">
            {[
              { title: "Wide Car Selection", desc: "Choose from economy to luxury models." },
              { title: "Flexible Plans", desc: "Hourly, daily, or weekly rental options." },
              { title: "Trusted by Thousands", desc: "Top rated by our loyal customers." },
            ].map((item, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card shadow-sm p-3 h-100">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">How It Works</h2>
          <div className="row">
            {[
              { step: "Choose a car", icon: "fa-search" },
              { step: "Pick a date", icon: "fa-calendar" },
              { step: "Enjoy the ride", icon: "fa-road" },
            ].map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <i className={`fa ${item.icon} fa-2x text-success mb-3`}></i>
                <h5>{item.step}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">What Our Customers Say</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p>"Super smooth process and clean vehicle. Booking was effortless!"</p>
                <footer className="blockquote-footer">Priya Sharma</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h2 className="mb-3">Ready to Book Your Ride?</h2>

          {/* Booking Options in CTA */}
          <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
            <div
              className="p-3 rounded bg-light text-dark option-card"
              style={{ cursor: "pointer", border: "2px solid #198754", minWidth: 180 }}
              onClick={handleSelfDriveClick}
            >
              <i className="fa fa-car fa-2x mb-2 text-success"></i>
              <h6 className="mb-0">With Self Drive</h6>
            </div>

            <div
              className="p-3 rounded bg-light text-dark option-card "
              style={{ cursor: "pointer", border: "2px solid #0d6efd", minWidth: 180 }}
              onClick={handleWithDriverClick}
            >
              <i className="fa fa-user fa-2x mb-2 text-primary"></i>
              <h6 className="mb-0 ">With Driver</h6>
            </div>
          </div>
        </div>
      </section>

      {/* Hover effect */}
      <style>{`
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
