// Dependencies
import React from "react";

// Style
import "../../styles/lastUser.css";

// Utils
import burl from "../../utils/api";

// Render Page/Component
function LastUser(props) {
  return props.data
    ? props.data.map((data) => {
        return (
          <>
            <div className="lastUser--item">
              <div className="lastUser--item--avatar">
                <img
                  src={burl + data.avatar}
                  onError={(e) => (
                    (e.target.onError = null),
                    (e.target.src = burl + `/images/default-avatar.png`)
                  )}
                />
              </div>
              <div className="lastUser--item--name">
                {data.name} {data.lastName}
              </div>
            </div>
          </>
        );
      })
    : null;
}

export default LastUser;
