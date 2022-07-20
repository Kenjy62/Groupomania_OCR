// Dependencies
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

// Provider
import { PopupContext } from "../../../utils/context/popup";
import { InputCommentContext } from "../../../utils/context/input_comment";
import { PostContext } from "../../../utils/context/post";

// Render Page/Component
function PostActions(props) {
  let post = props.props;

  // Context
  const { togglePopup } = useContext(PopupContext);
  const { toggleInput } = useContext(InputCommentContext);
  const { DeletePost } = useContext(PostContext);

  // State
  const [action, setAction] = useState();
  const [alreadyLiked, setAlreadyLiked] = useState(0);
  const [alreadyDisliked, setAlreadyDisliked] = useState(0);
  const [postId, setPostId] = useState();
  const [countLikes, setCountLikes] = useState(post.likes);
  const [countDislikes, setCountDislikes] = useState(post.dislikes);

  // Verify if already liked/disliked by user
  useEffect(() => {
    if (props.user) {
      let alreadyLiked = post.usersLiked.indexOf(props.user.name) > -1;
      let alreadyDisliked = post.usersDisliked.indexOf(props.user.name) > -1;
      if (alreadyLiked) {
        setAlreadyLiked(1);
      } else if (alreadyDisliked) {
        setAlreadyDisliked(1);
      }
    }
  }, []);

  // Set Reaction
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (action == -1 && alreadyLiked == 1) {
      alert("Aimer et ne pas aimer en même temps ?!");
    } else if (action == 1 && alreadyDisliked == 1) {
      alert("Aimer et ne pas aimer en même temps ?!");
    } else {
      let data = {
        name: props.user.name,
        reaction: action,
      };

      fetch("http://localhost:3000/api/post/test/" + postId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          if (action === 1) {
            setAlreadyLiked(1);
            setCountLikes(countLikes + 1);
          } else if (action === -1) {
            setAlreadyDisliked(1);
            setCountDislikes(countDislikes + 1);
          } else if (action === 0) {
            setAlreadyLiked(0);
            setAlreadyDisliked(0);
            const data = res.json();
            data.then((data) => {
              if (data.state == "like") {
                setCountLikes(countLikes - 1);
              } else if (data.state == "dislike") {
                setCountDislikes(countDislikes - 1);
              }
            });
          }
        }
      });
    }
  }, [postId, action]);

  return (
    <>
      <div id={post._id} className="post--details--content--actions">
        <span onClick={() => toggleInput(post._id)}>
          <i class="fa-solid fa-comment"></i>
        </span>
        {props.option != "details" ? (
          <Link to={"/post/" + post._id}>
            <span>
              <i class="fa-solid fa-comments"></i> ({post.comments.length})
            </span>
          </Link>
        ) : (
          <span>
            <i class="fa-solid fa-comments" style={{ color: "white" }}></i> (
            {post.comments.length})
          </span>
        )}
        <span
          value={alreadyLiked == 1 ? "0" : "1"}
          onClick={() => {
            setAction(alreadyLiked == 1 ? 0 : 1);
            setPostId(post._id);
          }}
        >
          {alreadyLiked == 1 ? (
            <i className="fa-solid fa-heart" style={{ color: "green" }}></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}
          ({countLikes})
        </span>
        <span
          value={alreadyDisliked == 1 ? "0" : "-1"}
          onClick={() => {
            setAction(alreadyDisliked == 1 ? 0 : -1);
            setPostId(post._id);
          }}
        >
          {alreadyDisliked == 1 ? (
            <i style={{ color: "red" }} className="fa-solid fa-heart-crack"></i>
          ) : (
            <i className="fa-solid fa-heart-crack"></i>
          )}
          ({countDislikes})
        </span>
        {props.user ? (
          post.author == props.user.name || props.user.admin == true ? (
            <span>
              <i
                onClick={() => togglePopup("edit_post", post)}
                class="fa-solid fa-pen"
              ></i>
            </span>
          ) : null
        ) : (
          <span>Loading</span>
        )}
        {props.user ? (
          post.author == props.user.name || props.user.admin == true ? (
            <span onClick={() => DeletePost(post._id)}>
              <i class="fa-solid fa-trash"></i>
            </span>
          ) : null
        ) : (
          <span>Loading</span>
        )}
      </div>
    </>
  );
}

export default PostActions;
