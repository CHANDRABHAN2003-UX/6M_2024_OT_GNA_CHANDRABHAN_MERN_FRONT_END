import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBookinglist() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function fetchBookings() {
    try {

      const response = await axios.post("http://localhost:5050/admin/all/bookings",{}, {headers: { Authorization: sessionStorage.getItem("token") }})
      

      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setBookings(response.data.bookings || []);
      }

    } catch (err) {
      console.error("Error fetching bookings:", err.message);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  fetchBookings();
}, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div>
      <h2>All Bookings (Admin View)</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Phone No</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Booking Time</th>
            <th>Distance (km)</th>
            <th>Duration</th>
              <th>PickUp Day</th>
            <th>Total Cost (₹)</th>
            <th>OTP</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const dateObj = new Date(booking.createdAt);
             const datePick = new Date(booking.date);
            const displayDate = dateObj.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
             const picDate = datePick.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            return (
              <tr key={booking._id || booking.id}>
                <td>{booking.fullName || booking.userName || "N/A"}</td>
                <td>{booking.phoneNumber || booking.userPhone || "N/A"}</td>
                <td>{booking.pickupLocation}</td>
                <td>{booking.dropLocation}</td>
                <td>{displayDate} </td>
               <td>
  {booking.distance}&nbsp;<span style={{ color: 'red' }}>KM</span>
</td>

                <td>{booking.duration}</td>
                 <td>{booking.time} <br/> {picDate}</td>
                <td>{booking.totalCost}</td>
                 <td>{booking.otp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
