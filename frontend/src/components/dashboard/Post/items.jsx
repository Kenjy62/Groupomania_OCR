// Required
import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

// Component
import PostActions from "./actions";
import CreateComments from "./create-comments";
import Loader from "../../global/loader";

const PostList = (props) => {
  if (!props.item) {
    return <Loader />;
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
                    <PostActions props={post} user={props.user} key={key} />
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
