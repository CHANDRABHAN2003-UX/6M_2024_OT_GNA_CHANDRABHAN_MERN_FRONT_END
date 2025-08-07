import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookingConfirm() {
  const [details, setDetails] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [finalCost, setFinalCost] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const slipRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const bookingData = localStorage.getItem("bookingDetails");
    if (bookingData) {
      setDetails(JSON.parse(bookingData));
    } else {
      navigate("/booking");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.post("http://localhost:5050/viewer/news/all", {}, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        setCars(res.data.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  const handleCarSelection = (e) => {
    const carId = e.target.value;
    setSelectedCarId(carId);

    const car = cars.find(c => c._id === carId);
    setSelectedCar(car);

    if (car && details) {
      const total = car.pricePerKm * parseFloat(details.distance);
      setFinalCost(total.toFixed(2));
    }
  };

  const handlePrint = () => {
    const printContents = slipRef.current.innerHTML;
    const newWindow = window.open("", "", "height=600,width=800");
    newWindow.document.write("<html><head><title>Booking Slip</title></head><body>");
    newWindow.document.write(printContents);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  const handleConfirmBooking = async () => {
    if (!selectedCar || isSubmitting) return;

    setIsSubmitting(true);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const bookingPayload = {
      fullName: details.name,
      phoneNumber: details.phone,
      pickupLocation: details.pickupLocation,
      dropLocation: details.dropLocation,
      date: details.date,
      time: details.time,
      distance: details.distance,
      duration: details.duration,
      carId: selectedCar._id,
      carTitle: selectedCar.title,
      pricePerKm: selectedCar.pricePerKm,
      totalCost: finalCost,
      otp: otp,
    };

    try {
      await axios.post("http://localhost:5050/viewer/booking/confirm", bookingPayload, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });

      setBookingSuccess(true);
      alert(`Booking confirmed with ${selectedCar.title} for ₹${finalCost}. OTP: ${otp}`);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!details) return null;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4 bg-light">
        <h2 className="text-center mb-4 text-primary">Booking Confirmation</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>Name:</strong> {details.name}</p>
            <p><strong>Phone:</strong> {details.phone}</p>
            <p><strong>Pickup:</strong> {details.pickupLocation}</p>
            <p><strong>Drop:</strong> {details.dropLocation}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Date:</strong> {details.date}</p>
            <p><strong>Time:</strong> {details.time}</p>
            <p><strong>Distance:</strong> {details.distance} km</p>
            <p><strong>Duration:</strong> {details.duration}</p>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label"><strong>Select a Car</strong></label>
          <select
            className="form-select shadow-sm"
            value={selectedCarId}
            onChange={handleCarSelection}
            disabled={bookingSuccess}
          >
            <option value="">-- Choose a Car --</option>
            {cars.map(car => (
              <option key={car._id} value={car._id}>
                {car.title} (₹{car.pricePerKm}/km)
              </option>
            ))}
          </select>
        </div>

        {selectedCar && (
          <div className="card mt-4 border-0 shadow-sm bg-white p-3">
            <div className="row">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img
                  src={`http://localhost:5050/${selectedCar.image}`}
                  alt={selectedCar.title}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <h5 className="text-primary">{selectedCar.title}</h5>
                <p><strong>Model:</strong> {selectedCar.model}</p>
                <p><strong>Price per Km:</strong> ₹{selectedCar.pricePerKm}</p>
                <h5 className="text-success"><strong>Total Cost:</strong> ₹{finalCost}</h5>
              </div>
            </div>
          </div>
        )}

        {/* Update Booking Option */}
        <div className="text-center mt-4">
          <div className="alert alert-warning">
            <p className="mb-3">Want to update your booking information?</p>
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/booking")}
              disabled={bookingSuccess}
            >
              Update Booking
            </button>
          </div>
        </div>

        {/* Confirm Booking Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-lg px-5 shadow"
            onClick={handleConfirmBooking}
            disabled={!selectedCar || bookingSuccess || isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>

        {bookingSuccess && (
          <>
            <div className="alert alert-success mt-4 text-center">
              Booking confirmed!{" "}
              {details.bookingType === "self-drive" && (
                <span>You can pick up your car from our nearest office.</span>
              )}
              <div className="mt-3">
                <button className="btn btn-primary" onClick={handlePrint}>
                  Print Booking Slip
                </button>
              </div>
            </div>

            <div
              ref={slipRef}
              className="mt-4 p-4 border rounded shadow-sm bg-white"
              style={{ maxWidth: "450px", margin: "0 auto" }}
            >
              <h4 className="text-center text-success mb-4">Booking Slip</h4>

              <div className="mb-3">
                <p><strong>Name:</strong> {details.name}</p>
                <p><strong>Phone:</strong> {details.phone}</p>
                <p><strong>Pickup Location:</strong> {details.pickupLocation}</p>
                <p><strong>Drop Location:</strong> {details.dropLocation}</p>
                <p><strong>Booking Date:</strong> {details.date}</p>
                <p><strong>Time:</strong> {details.time}</p>
              </div>

              <div className="mb-3 border-top pt-3">
                <p><strong>Distance:</strong> {details.distance} km</p>
                <p><strong>Duration:</strong> {details.duration}</p>
                <p><strong>Car:</strong> {selectedCar?.title}</p>
                <p><strong>Price per Km:</strong> ₹{selectedCar?.pricePerKm}</p>
                <p className="fs-5 fw-bold"><strong>Total Cost:</strong> ₹{finalCost}</p>
              </div>

              <div className="text-center mt-4">
                <h6 className="mb-3">Scan to Pay</h6>
                <img
                  src="/assets/img/paymentScanner.jpeg"
                  alt="QR Code"
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    marginBottom: "20px",
                  }}
                />

                <p className="mt-4 fs-5 fw-semibold">OR</p>

                <p className="mt-3 p-3 bg-warning bg-opacity-25 border border-warning rounded text-center">
                  Please <strong>Pay Cash to the Driver</strong> at Time of Pickup.
                </p>

                <p className="mt-3 p-3 bg-light border border-primary rounded text-center">
                  Please <strong>Pay Cash at the Office</strong> at Time of Pickup if you{" "}
                  <em>self drive</em>.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
