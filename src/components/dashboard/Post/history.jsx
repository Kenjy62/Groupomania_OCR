// Dependencies
import React from "react";
import { useContext, useEffect } from "react";

// Components
import Loader from "../../global/loader";
import Item from "../Post/history/item";

// Provider
import { PopupContext } from "../../../utils/context/popup";
import { PostContext } from "../../../utils/context/post";

// Plugins
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function History() {
  // Close popup
  const { data } = useContext(PopupContext);
  const { postHistory, HistoryPost } = useContext(PostContext);

  // Load History Post
  useEffect(() => {
    HistoryPost(data);
  }, []);

  return (
    <>
      <div className="post--history">
        <SimpleBar style={{ maxHeight: 500 }}>
          {postHistory ? (
            postHistory.reverse().map((item, key) => {
              return <Item post={item} />;
            })
          ) : (
            <Loader />
          )}
        </SimpleBar>
      </div>
    </>
  );
}

export default History;
