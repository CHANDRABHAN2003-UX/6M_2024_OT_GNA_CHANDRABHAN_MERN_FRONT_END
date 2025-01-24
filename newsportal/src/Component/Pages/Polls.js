import axios from "axios";
import { useState, useEffect } from "react";

export default function Polls() {
    const [polls, setPolls] = useState([]);
    const [pollOptions, setPollOptions] = useState([]);
    const [showOptions, setShowOptions] = useState({});
    const [viewerId, setViewerId] = useState("");

    // Fetch all polls
    useEffect(() => {
        axios
            .post(
                "http://localhost:5050/admin/all/poll",
                {},
                { headers: { Authorization: sessionStorage.getItem("token") } }
            )
            .then((res) => {
                setPolls(res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching polls:", err);
            });
    }, []);

    // Fetch ViewerId from sessionStorage
    useEffect(() => {
        const storedViewerId = sessionStorage.getItem("viewerId");
        setViewerId(storedViewerId);
    }, []);

    // Fetch all poll options
    useEffect(() => {
        fetchPollOptions();
    }, []);

    const fetchPollOptions = () => {
        axios
            .post("http://localhost:5050/viewer/pollOption/all", {})
            .then((res) => {
                console.log("Poll Options Response:", res.data.data); // Debugging
                setPollOptions(res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching poll options:", err);
            });
    };

    const handleOptionSelect = (optionId, pollId) => {
        if (!viewerId || !optionId || !pollId) {
            alert("Missing required fields: viewerId, optionId, or pollId");
            return;
        }

        const data = {
            viewerId,
            optionId,
            pollId,
        };

        console.log("Data sent to API:", data); // Debugging

        axios
            .post("http://localhost:5050/viewer/pollLikes/add", data)
            .then((res) => {
                console.log("Poll like added:", res.data.data);
                alert(res.data.message);
                // Refresh poll options after like
                fetchPollOptions();
            })
            .catch((err) => {
                console.error("Error liking poll option:", err);
            });
    };

    // Helper function to calculate percentage for UI
    const calculatePercentage = (optionLikes, totalLikes) => {
        if (totalLikes === 0) return "0%";
        return `${((optionLikes / totalLikes) * 100).toFixed(1)}%`;
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {polls.map((poll, index) => {
                    // Filter options for the current poll
                    const options = pollOptions.filter(
                        (opt) => opt.pollId && opt.pollId._id === poll._id
                    );

                    // Calculate total likes for this poll
                    const totalLikes = options.reduce(
                        (sum, opt) => sum + (opt.likes || 0),
                        0
                    );

                    console.log(`Poll ID: ${poll._id}, Total Likes: ${totalLikes}`); // Debugging

                    return (
                        <div className="col-md-4 mb-4" key={poll._id}>
                            <div
                                className="card"
                                style={{
                                    border: "2px solid green",
                                    borderRadius: "10px",
                                    padding: "10px",
                                }}
                            >
                                <img
                                    src={"http://localhost:5050/" + poll.image}
                                    alt="Poll"
                                    className="card-img-top"
                                    style={{
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {poll.pollQuestion}
                                    </h5>
                                    <button
                                        className="btn btn-primary btn-sm mt-2"
                                        onClick={() =>
                                            setShowOptions((prev) => ({
                                                ...prev,
                                                [index]: !prev[index],
                                            }))
                                        }
                                    >
                                        {showOptions[index]
                                            ? "Hide Options"
                                            : "Show Options"}
                                    </button>
                                    {showOptions[index] && (
                                        <div className="mt-3">
                                            <h6>Options:</h6>
                                            <ul className="list-group">
                                                {options.map((opt, idx) => (
                                                    <li
                                                        className="list-group-item d-flex justify-content-between align-items-center"
                                                        key={opt._id}
                                                    >
                                                        {opt.option}
                                                        <div>
                                                            <span className="badge bg-success me-2">
                                                                {calculatePercentage(
                                                                    opt.likes || 0,
                                                                    totalLikes
                                                                )}
                                                            </span>
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() =>
                                                                    handleOptionSelect(
                                                                        opt._id,
                                                                        poll._id
                                                                    )
                                                                }
                                                            >
                                                                Select
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
