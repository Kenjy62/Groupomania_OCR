// Dependencies
import React from "react";
import { useContext, useEffect } from "react";

// Components
import Loader from "../../global/loader";
import Item from "../Post/history/item";

// Provider
import { PopupContext } from "../../../utils/context/popup";
import { PostContext } from "../../../utils/context/post";

function History(props) {
  // Close popup
  const { togglePopup, data } = useContext(PopupContext);
  const { postHistory, HistoryPost } = useContext(PostContext);

  useEffect(() => {
    HistoryPost(data);
  }, []);

  return (
    <>
      <div className="post--history">
        {postHistory ? (
          postHistory.reverse().map((item, key) => {
            return <Item post={item} />;
          })
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default History;
