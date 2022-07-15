import React from "react";
import Moment from "react-moment";
import { useContext } from "react";

import { PopupContext } from "../../../../utils/context/popup";

function Item(props) {
  const { togglePopup } = useContext(PopupContext);

  return (
    <>
      <div
        onClick={() => {
          togglePopup();
        }}
        className="popup--close"
      >
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div className="history--item">
        <div className="history--item--text">{props.post.text}</div>

        {props.post.imageUrl != "" ? (
          <div className="history--item--image">
            <img src={props.post.imageUrl} />
          </div>
        ) : null}

        <div className="history--item--infos">
          <span>
            Modifer par {props.post.updateBy} le{" "}
            <Moment format="DD/MM/YYYY à HH:mm:ss">
              {props.post.updateAt}
            </Moment>
          </span>
        </div>
      </div>
    </>
  );
}

export default Item;
