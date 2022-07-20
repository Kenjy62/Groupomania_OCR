// Dependencies
import { useEffect, useState, useContext } from "react";

// Style
import "../../../styles/dashboard.css";

// Provider
import { PopupContext } from "../../../utils/context/popup";
import { PostContext } from "../../../utils/context/post";

// Components
import PostList from "./items";
import PostDetails from "../../post_details/post-details";
import Loader from "../../global/loader";

// Render Page/Component
function Posts(props) {
  // Context
  const { update } = useContext(PopupContext);
  const { LoadAllPost, feed } = useContext(PostContext);

  // State
  const [skip, setSkip] = useState(0);

  // Load Feed (10 by 10)
  useEffect(() => {
    LoadAllPost(skip);
    console.log(feed);
  }, [skip, update]);

  return (
    <>
      <div id="post--feed">
        {feed || (!feed && props.option == "profil") ? (
          // If Load Profil
          props.option == "profil" ? (
            <PostList key={Math.random()} item={props.post} user={props.user} />
          ) : // If Load Details of Post
          props.option == "details" ? (
            <PostDetails user={props.user} />
          ) : (
            // If Load Feed
            <PostList key={Math.random()} item={feed} user={props.user} />
          )
        ) : (
          <Loader />
        )}
      </div>

      {props.option != "details" ? (
        <div id="post--feed--bottom">
          <button
            className="seeMorePost"
            onClick={() => {
              setSkip(skip + 10);
            }}
          >
            Voir plus d'ancien post
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Posts;
