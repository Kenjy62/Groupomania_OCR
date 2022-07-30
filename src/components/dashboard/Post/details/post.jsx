import { useEffect, useState } from "react";
import "../../../styles/dashboard.css";
import ReactDOM from "react-dom";

import PostList from "./items";

import burl from "../../../../utils/api";

function Posts(props) {
  const user = props.data;
  const [skip, setSkip] = useState(0);
  const [postFeed, setPostFeed] = useState();
  const [isEdited, setPostEdited] = useState(null);

  useEffect(() => {
    setPostEdited(props.updateFunc);
  }, [props.updateFunc]);

  const test = () => {
    setSkip(skip + 10);
  };

  useEffect(() => {
    fetch(burl + "/post/" + skip + "/10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        const postList = res.json();
        postList.then((post) => {
          if (post.length > 0) {
            if (skip > 0) {
              setPostFeed((postFeed) => [...postFeed, ...post]);
            } else if (skip === 0) {
              setPostFeed(post);
            }
          } else {
            document.querySelector(
              "button.seeMorePost"
            ).textContent = `Fin de l'historique`;
          }
        });
      }
    });
  }, [skip, isEdited]);

  return (
    <>
      <div id="post--feed">
        <h1>post details</h1>
      </div>
      <div id="post--feed--bottom">
        <button className="seeMorePost" onClick={() => test()}>
          Voir plus d'ancien post
        </button>
      </div>
    </>
  );
}

export default Posts;
