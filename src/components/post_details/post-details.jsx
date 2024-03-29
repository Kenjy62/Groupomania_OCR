// Required
import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

// Components
import PostActions from "../dashboard/Post/actions";
import CreateComments from "../dashboard/Post/create-comments";
import PostComment from "./post_comment";

// Provider
import { PostContext } from "../../utils/context/post";
import { PopupContext } from "../../utils/context/popup";

// Utils
import burl from "../../utils/api";

// Render Page/Component
function PostDetails(props) {
  // Context
  const { GetComments, post, newComment } = useContext(PostContext);
  const { update } = useContext(PopupContext);

  // URL Converter
  var url = window.location.href;
  url = url.split("/");
  url = url[4];

  // Token
  const token = localStorage.getItem("token");

  // Get List of comments
  useEffect(() => {
    GetComments(url, token);
  }, [update, newComment]);

  return post === "Error" ? (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1>Ce poste n'existe pas !</h1>
    </div>
  ) : post ? (
    <>
      <div className="post">
        <div className="post--details--user">
          <Link to={"/user/" + post.author}>
            <div className="post--details--user--picture">
              <img
                alt={post.author + " Avatar"}
                src={burl + post.avatar}
                onError={(e) => (
                  (e.target.onError = null),
                  (e.target.src = burl + "/images/default-avatar.png")
                )}
              ></img>
            </div>
          </Link>
        </div>
        <div className="post--details--content">
          <div className="post--details--content--details">
            <span>{post.author}</span>{" "}
            <span>
              <i classNames="fa-solid fa-hourglass"></i>{" "}
              <Moment format="DD/MM/YYYY à HH:mm:ss">{post.createAt}</Moment>
            </span>
          </div>
          <div className="post--details--content--text">{post.text}</div>
          {post.imageUrl !== "" ? (
            <div className="post--details--content--image">
              <img alt={post._id + " Image"} src={burl + post.imageUrl}></img>
            </div>
          ) : null}
          <PostActions props={post} user={props.user} option={"details"} />
          <CreateComments post={post} user={props.user} />

          {post.comments.reverse().map((data) => {
            return (
              <PostComment
                key={Math.random()}
                post={data}
                id={post._id}
                user={props.user}
              />
            );
          })}
        </div>
      </div>
    </>
  ) : null;
}

export default PostDetails;
