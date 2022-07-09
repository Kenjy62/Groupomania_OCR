// Required
import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

// Component
import PostActions from "./actions";
import CreateComments from "./create-comments";

// Provider

import { InputCommentContext } from "../../../utils/context/input_comment";

const PostList = (props) => {
  var old = null;

  const visibility = (postId) => {
    if (old != null) {
      let div = document.querySelector("[post-id='" + old + "']");
      div.style.display = "none";
      let div2 = document.querySelector("[post-id='" + postId + "']");
      div2.style.display = "flex";
      old = postId;
    } else {
      let div = document.querySelector("[post-id='" + postId + "']");
      div.style.display = "flex";
      old = postId;
    }
  };

  if (!props.item) {
    return <h1>Aucun post pour le moment</h1>;
  } else {
    if (props.item.length === 0) {
      return (
        <h1 style={{ textAlign: "center" }}>Aucun post pour le moment..</h1>
      );
    } else {
      return (
        <>
          {props.item.map((post, key) => {
            return (
              <>
                <div className="post">
                  <div className="post--details--user">
                    <Link to={"/user/" + post.author}>
                      <div className="post--details--user--picture">
                        <img src={post.userdata[0].avatar}></img>
                      </div>
                    </Link>
                  </div>
                  <div className="post--details--content">
                    <div className="post--details--content--details">
                      <span>{post.author}</span>{" "}
                      <span>
                        <i class="fa-solid fa-hourglass"></i>{" "}
                        <Moment format="DD/MM/YYYY à HH:mm:ss">
                          {post.createAt}
                        </Moment>
                      </span>
                    </div>
                    <div className="post--details--content--text">
                      {post.text}
                    </div>
                    {post.imageUrl != "" ? (
                      <div className="post--details--content--image">
                        <img src={post.imageUrl}></img>
                      </div>
                    ) : null}
                    <PostActions
                      props={post}
                      user={props.user}
                      key={key}
                      isVisible={visibility}
                    />
                    <CreateComments post={post} user={props.user} />
                  </div>
                </div>
              </>
            );
          })}
        </>
      );
    }
  }
};
export default PostList;
