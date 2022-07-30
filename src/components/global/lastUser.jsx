// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

// Provider

import { PopupContext } from "../../utils/context/popup";

// Style
import "../../styles/lastUser.css";

// Utils
import burl from "../../utils/api";

// Render Page/Component
function LastUser(props) {
  const { callUpdate } = useContext(PopupContext);

  return props.data
    ? props.data.map((data) => {
        return (
          <div className="lastUser--item" key={data._id}>
            <div className="lastUser--item--avatar">
              <Link
                onClick={() => callUpdate(Math.random())}
                to={{
                  pathname: "/user/" + data.name,
                }}
              >
                <img
                  src={burl + data.avatar}
                  onError={(e) => (
                    (e.target.onError = null),
                    (e.target.src = burl + `/images/default-avatar.png`)
                  )}
                />
              </Link>
            </div>
            <div className="lastUser--item--name">
              {data.name} {data.lastName}
            </div>
          </div>
        );
      })
    : null;
}

export default LastUser;
