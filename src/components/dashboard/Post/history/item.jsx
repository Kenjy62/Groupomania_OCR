// Dependencies
import React from "react";
import Moment from "react-moment";
import { useContext } from "react";

// Provider
import { PopupContext } from "../../../../utils/context/popup";

// Utils
import burl from "../../../../utils/api";

// Components
import ClosePopup from "../../../global/close-popup";

function Item(props) {
  return (
    <>
      <ClosePopup />
      <div className="history--item" style={{ marginTop: 50 }}>
        <div className="history--item--text">{props.post.text}</div>

        {props.post.imageUrl != "" ? (
          <div className="history--item--image">
            <img src={burl + props.post.imageUrl} />
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
