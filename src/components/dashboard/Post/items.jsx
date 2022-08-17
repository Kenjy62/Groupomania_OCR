// Required
import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useContext } from "react";

// Component
import PostActions from "./actions";
import CreateComments from "./create-comments";
import Loader from "../../global/loader";

// Utils
import burl from "../../../utils/api";

// Provider
import { PopupContext } from "../../../utils/context/popup";

const PostList = (props) => {
  // Context
  const { togglePopup } = useContext(PopupContext);

  if (!props.item && props.item !== false) {
    return <Loader />;
  } else {
    if (props.item === false) {
      return (
        <h1 style={{ textAlign: "center", color: "white" }}>
          Aucun post pour le moment!
        </h1>
      );
    } else {
      return (
        <>
          {props.item.map((post, key) => {
            return (
              <div className="post" key={post._id}>
                <div className="post--details--user">
                  <Link to={"/user/" + post.author}>
                    <div className="post--details--user--picture">
                      <img
                        alt={post.author + " Avatar"}
                        src={burl + post.userdata[0].avatar}
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
                    <span>{post.author}</span>
                    <span>
                      <Moment format="DD/MM/YYYY à HH:mm:ss">
                        {post.createAt}
                      </Moment>
                    </span>
                  </div>
                  <div className="post--details--content--text">
                    {post.text}
                  </div>
                  {post.imageUrl !== "" ? (
                    <div className="post--details--content--image">
                      <img
                        src={burl + post.imageUrl}
                        alt={post._id}
                        onError={(e) => (
                          (e.target.onError = null),
                          (e.target.src = burl + "/images/img-404.png")
                        )}
                      ></img>
                    </div>
                  ) : null}
                  <PostActions props={post} user={props.user} key={key} />
                  <CreateComments post={post} user={props.user} />
                  <div className="post--edit">
                    {post.edit > 0 ? (
                      <span
                        onClick={() => togglePopup("post_history", post._id)}
                      >
                        Modifier {post.edit} fois
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  }
};
export default PostList;
