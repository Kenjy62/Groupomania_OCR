// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Style
import "../../styles/topPost.css";

// Utils
import burl from "../../utils/api";

function TopPost(props) {
  return props.data
    ? props.data.map((data) => {
        return (
          <Link to={"/post/" + data._id} key={data._id}>
            <div className="topPost--item">
              <div className="topPost--item--avatar">
                <img
                  alt={data.userdata[0].name + " Avatar"}
                  src={burl + data.userdata[0].avatar}
                  onError={(e) => (
                    (e.target.onError = null),
                    (e.target.src = burl + "/images/default-avatar.png")
                  )}
                />
              </div>
              <div className="topPost--item--content">
                <span>{data.text}</span>
              </div>
              <div className="topPost--item--likes">
                <i className="fa-regular fa-heart"></i>
                <span>{data.likes}</span>
              </div>
            </div>
          </Link>
        );
      })
    : null;
}

export default TopPost;
