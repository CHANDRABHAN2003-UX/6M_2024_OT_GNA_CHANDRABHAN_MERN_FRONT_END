import { Link } from "react-router-dom";

export default function Card({ item }) {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={`http://localhost:5050/${item.image}`}
        className="card-img-top"
        alt={item.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text"><strong>Model:</strong> {item.model}</p>
        <p className="card-text"><strong>Seats:</strong> {item.seatingCapacity}</p>
        <Link
          to={`/booking/${item._id}`}
          className="btn btn-primary mt-2"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
