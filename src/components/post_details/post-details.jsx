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

function PostDetails(props) {
  // Context
  const { GetComments, post, newComment } = useContext(PostContext);
  const { update } = useContext(PopupContext);

  // Convert URL for getting user profil name
  var url = window.location.href;
  url = url.split("/");
  url = url[4];

  // Token
  const token = localStorage.getItem("token");

  useEffect(() => {
    GetComments(url, token);
  }, [update, newComment]);

  return post ? (
    <>
      <div className="post">
        <div className="post--details--user">
          <Link to={"/user/" + post.author}>
            <div className="post--details--user--picture">
              <img
                src={post.avatar}
                onError={(e) => (
                  (e.target.onError = null),
                  (e.target.src = "http://localhost:3000/images/default.png")
                )}
              ></img>
            </div>
          </Link>
        </div>
        <div className="post--details--content">
          <div className="post--details--content--details">
            <span>{post.author}</span>{" "}
            <span>
              <i class="fa-solid fa-hourglass"></i>{" "}
              <Moment format="DD/MM/YYYY à HH:mm:ss">{post.createAt}</Moment>
            </span>
          </div>
          <div className="post--details--content--text">{post.text}</div>
          {post.imageUrl != "" ? (
            <div className="post--details--content--image">
              <img src={post.imageUrl}></img>
            </div>
          ) : null}
          <PostActions props={post} user={props.user} option={"details"} />
          <CreateComments post={post} user={props.user} />

          {post.comments.reverse().map((data) => {
            return <PostComment post={data} id={post._id} user={props.user} />;
          })}
        </div>
      </div>
    </>
  ) : null;
}

export default PostDetails;
