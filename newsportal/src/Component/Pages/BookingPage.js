import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = "AIzaSyDDQNyvN8tT2JpnZNrbWIxIiEt6B43ZDaw"; // use your own key

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    date: "",
    time: "",
  });

  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [dropAutocomplete, setDropAutocomplete] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const navigate = useNavigate();

 useEffect(() => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const todayStr = `${yyyy}-${mm}-${dd}`;
  setMinDate(todayStr);

  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const yyyyMax = nextMonth.getFullYear();
  const mmMax = String(nextMonth.getMonth() + 1).padStart(2, "0");
  const ddMax = String(nextMonth.getDate()).padStart(2, "0");

  const maxDateStr = `${yyyyMax}-${mmMax}-${ddMax}`;
  setMaxDate(maxDateStr);

  // 👇 Load data from localStorage if available
  const savedData = localStorage.getItem("bookingDetails");
  if (savedData) {
    const parsed = JSON.parse(savedData);
    setFormData((prev) => ({
      ...prev,
      name: parsed.name || "",
      phone: parsed.phone || "",
      pickupLocation: parsed.pickupLocation || "",
      dropLocation: parsed.dropLocation || "",
      date: parsed.date || "",
      time: parsed.time || "",
    }));
  }
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits for phone number input
      if (!/^\d*$/.test(value)) {
        return; // ignore if not digit
      }
      // limit length to 10
      if (value.length > 10) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onPickupPlaceChanged = () => {
    if (pickupAutocomplete) {
      const place = pickupAutocomplete.getPlace();
      setFormData((prev) => ({
        ...prev,
        pickupLocation: place.formatted_address,
      }));
    }
  };

  const onDropPlaceChanged = () => {
    if (dropAutocomplete) {
      const place = dropAutocomplete.getPlace();
      setFormData((prev) => ({
        ...prev,
        dropLocation: place.formatted_address,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number: starts with 9 or 8 and length 10
    if (!/^([89])\d{9}$/.test(formData.phone)) {
      toast.error(
        "Phone number must be 10 digits long and start with 9 or 8."
      );
      return;
    }

    // Validate date in range (should be guaranteed by min/max on input, but just in case)
    const selectedDate = new Date(formData.date);
    const today = new Date(minDate);
    const maxAllowedDate = new Date(maxDate);

    if (selectedDate < today || selectedDate > maxAllowedDate) {
      toast.error(
        `Date must be between ${minDate} and ${maxDate}.`
      );
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: formData.pickupLocation,
        destination: formData.dropLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const distance = result.routes[0].legs[0].distance.value / 1000; // in km
          const duration = result.routes[0].legs[0].duration.text;

          const bookingDetails = {
            ...formData,
            distance: distance.toFixed(2),
            duration,
            totalCost: (distance * 12).toFixed(2),
          };

          localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
          navigate("/confirm");
        } else {
          toast.error("Failed to calculate route. Please check the locations.");
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="container mt-5 mb-5">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Book Your Ride</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Pickup Location</label>
                <Autocomplete
                  onLoad={(autoC) => setPickupAutocomplete(autoC)}
                  onPlaceChanged={onPickupPlaceChanged}
                >
                  <input
                    type="text"
                    name="pickupLocation"
                    className="form-control"
                    placeholder="From where?"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                  />
                </Autocomplete>
              </div>
              <div className="col-md-6">
                <label className="form-label">Drop Location</label>
                <Autocomplete
                  onLoad={(autoC) => setDropAutocomplete(autoC)}
                  onPlaceChanged={onDropPlaceChanged}
                >
                  <input
                    type="text"
                    name="dropLocation"
                    className="form-control"
                    placeholder="Where to?"
                    value={formData.dropLocation}
                    onChange={handleChange}
                    required
                  />
                </Autocomplete>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={minDate}
                  max={maxDate}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  name="time"
                  className="form-control"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="d-grid mt-4">
              <button className="btn btn-primary btn-lg" type="submit">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoadScript>
  );
}
