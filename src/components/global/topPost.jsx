// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Style
import "../../styles/topPost.css";

// Utils
import burl from "../../utils/api";

function TopPost(props) {
  console.log(props);
  return props.data
    ? props.data.map((data) => {
        return (
          <>
            <Link to={"/post/" + data._id}>
              <div className="topPost--item">
                <div className="topPost--item--avatar">
                  <img src={burl + data.userdata[0].avatar} />
                </div>
                <div className="topPost--item--content">{data.text}</div>
                <div className="topPost--item--likes">
                  <i class="fa-regular fa-heart"></i>
                  <span>{data.likes}</span>
                </div>
              </div>
            </Link>
          </>
        );
      })
    : null;
}

export default TopPost;
