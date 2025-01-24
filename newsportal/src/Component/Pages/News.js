import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css"; // Import FontAwesome icons

export default function News() {
  const [data1, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [comment, setComment] = useState("");
  const [ViewerId, setViewerId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const fetchComments = (newsId) => {
    axios
      .post(
        "http://localhost:5050/viewer/comment/all",
        { newsId },
        { headers: { Authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        setComments((prev) => ({ ...prev, [newsId]: res.data.data })); // Store comments by newsId
      })
      .catch((err) => {
        console.error("Failed to fetch comments:", err);
      });
  };
  useEffect(() => {
    console.log("useEffect hook call");
    axios
      .post("http://localhost:5050/viewer/news/all", {}, { headers: { Authorization: sessionStorage.getItem("token") } })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const storedViewerId = sessionStorage.getItem("viewerId");
    setViewerId(storedViewerId);
  }, []); 
  const toggleCommentsVisibility = (newsId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [newsId]: !prev[newsId], // Toggle visibility
    }));
  };

  const addComment = (newsId) => {
    console.log("Adding comment:", { newsId, comment, viewerId: ViewerId });
    axios
      .post(
        "http://localhost:5050/viewer/comment/add",
        { newsId, comment, viewerId: ViewerId },
        { headers: { Authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        toast.success("Comment added successfully!");
        const newComment = res.data.data; // Assuming the API returns the added comment
        setComments((prev) => ({
          ...prev,
          [newsId]: prev[newsId] ? [...prev[newsId], newComment] : [newComment],
        }));
        setComment(""); // Clear the input field
      })
      .catch((err) => {
        toast.error("Failed to add comment");
        console.error(err);
      });
  };
  
  const updateComment = (newsId) => {
    axios
      .post(
        "http://localhost:5050/viewer/comment/update",
        { _id: commentId, comment: comment, viewerId: ViewerId, newsId },
        { headers: { Authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        toast.success("Comment updated successfully!");
        setComments((prev) => ({
          ...prev,
          [newsId]: prev[newsId].map((c) =>
            c._id === commentId ? { ...c, comment } : c
          ),
        }));
        setComment(""); // Clear the input field
        setCommentId(""); // Clear the editing state
      })
      .catch((err) => {
        toast.error("Failed to update comment");
        console.error(err);
      });
  };
  



  return (
    <>
    <div className="container">
    <div className="row">
      <ClipLoader color="red" cssOverride={{}} loading={load} size={100} />
      <div className="col">
        {!load ? (
          <div className="row">
            {data1?.map((el) => (
              <div className="col-md-4 mb-4" key={el._id}>
                <div className="card" style={{ border: "2px solid green" }}>
                  <img
                    src={`http://localhost:5050/${el.image}`}
                    className="card-img-top"
                    alt={el.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{el.title}</h5>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        if (selectedNewsId === el._id) {
                          setSelectedNewsId(null);
                        } else {
                          setSelectedNewsId(el._id);
                          fetchComments(el._id); // Fetch comments for this newsId
                        }
                      }}
                    >
                      {selectedNewsId === el._id ? "Hide Details" : "Read More"}
                    </button>
                    {selectedNewsId === el._id && (
                      <div>
                        <p className="card-text">{el.description}</p>
                        <div className="mt-3">
                          <textarea
                            className="form-control"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Enter your comment here..."
                            rows="3"
                          />
                          <div className="mt-2">
                            <i
                              className="fa fa-plus-circle me-2"
                              style={{ cursor: "pointer", fontSize: "20px" }}
                              onClick={() => addComment(el._id)}
                              title="Add Comment"
                            ></i>
                          </div>
                        </div>
                        <div className="mt-3">
                          <h6>Comments:</h6>
                          {comments[el._id]?.length > 0 ? (
  <>
    {comments[el._id]
      .slice(
        0,
        visibleComments[el._id] ? comments[el._id].length : 4
      )
      .map((commentObj) => (
        <div key={commentObj._id} className="d-flex align-items-center">
          {commentId === commentObj._id ? (
            <textarea
              className="form-control me-2"
              value={comment}
              onChange={handleCommentChange}
            />
          ) : (
            <p className="mb-0 me-2">{commentObj.comment}</p>
          )}
          {commentObj.viewerId === ViewerId && (
            <>
              {commentId === commentObj._id ? (
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateComment(el._id)}
                >
                  Save
                </button>
              ) : (
                <i
                  className="fa fa-pencil-square-o"
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={() => {
                    setComment(commentObj.comment);
                    setCommentId(commentObj._id); 
                  }}
                  title="Edit Comment"
                ></i>
              )}
            </>
          )}
        </div>
      ))}
    {comments[el._id].length > 4 && (
      <button
        className="btn btn-link"
        onClick={() => toggleCommentsVisibility(el._id)}
      >
        {visibleComments[el._id] ? "View Less" : "View All Comments"}
      </button>
    )}
  </>
) : (
  <p>No comments available.</p>
)}
                            <p>No comments available.</p>
                          
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  </div>
    </>
  );
}
