// Required
import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Components
import PostActions from "../dashboard/Post/actions";
import CreateComments from "../dashboard/Post/create-comments";
import PostComment from "./post_comment";

// Provider
import { PostContext } from "../../utils/context/post";
import { PopupContext } from "../../utils/context/popup";

function PostDetails(props) {
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
              <img src="https://i.picsum.photos/id/599/200/200.jpg?hmac=2WLKs3sxIsaEQ-6WZaa6YMxgl6ZC4cNnid0aqupm2is"></img>
            </div>
          </Link>
        </div>
        <div className="post--details--content">
          <div className="post--details--content--details">
            <span>{post.author}</span>{" "}
            <span>
              <i class="fa-solid fa-hourglass"></i> 3 hours
            </span>
          </div>
          <div className="post--details--content--text">{post.text}</div>
          {post.imageUrl != "" ? (
            <div className="post--details--content--image">
              <img src={post.imageUrl}></img>
            </div>
          ) : null}
          <PostActions props={post} user={props.user} />
          <CreateComments post={post} user={props.user} />

          {post.comments.reverse().map((post, key) => {
            return <PostComment post={post} />;
          })}
        </div>
      </div>
    </>
  ) : null;
}

export default PostDetails;
