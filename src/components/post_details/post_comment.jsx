// Dependencies
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

// Provider
import { useContext } from "react";
import { PostContext } from "../../utils/context/post";

import burl from "../../utils/api";

function PostComment(props) {
  // Context
  const { DeleteComment } = useContext(PostContext);

  return (
    <div className="post--details--comments--list">
      <div className="post--details--comments--list--user">
        <Link to={"/user/" + props.post.author}>
          <img
            src={burl + props.post.avatar}
            onError={(e) => (
              (e.target.onError = null),
              (e.target.src = burl + "/images/default-avatar.png")
            )}
          ></img>
        </Link>
      </div>
      <div className="post--details--comments--list--content">
        <div className="post--details--content--details">
          <span>{props.post.author}</span>{" "}
          <span>
            <i className="fa-solid fa-hourglass"></i>{" "}
            <Moment format="DD/MM/YYYY à HH:mm:ss">
              {props.post.createAt}
            </Moment>
          </span>
        </div>
        <div className="post--details--content--text">{props.post.text}</div>
        {props?.user?.admin === true ? (
          <div
            style={{
              marginTop: 15,
              color: "white",
              cursor: "pointer",
              textAlign: "right",
            }}
            value={props.post._id}
            onClick={() =>
              DeleteComment(
                props.post._id,
                localStorage.getItem("token"),
                props.id
              )
            }
          >
            <span>Supprimer le commentaire</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PostComment;
