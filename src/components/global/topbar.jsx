// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

// Utils
import burl from "../../utils/api";

// Provider

import { SystemContext } from "../../utils/context/system";

// Render Page/Component
function Topbar(props) {
  // Context
  const { liveSearchUser } = useContext(SystemContext);

  // Token
  const token = localStorage.getItem("token");

  return (
    <div className="topBar">
      <div className="topBar--links"></div>
      <div className="topBar--search">
        <div className="topBar--search--icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input
          className="topBar--search--input"
          type="text"
          placeholder="Recherche une personne"
          onChange={(e) => liveSearchUser(e.target.value, token)}
        ></input>
      </div>
      <div className="topBar--user">
        <span>Hey, {!props.user ? null : props.user.name} !</span>
        {!props.user ? null : (
          <Link to={"/user/" + props.user.name} replace={true}>
            <img
              alt={props.user.name + " Avatar"}
              src={!props.user ? null : burl + props.user.avatar}
              onError={(e) => (
                (e.target.onError = null),
                (e.target.src = burl + `/images/default-avatar.png`)
              )}
            ></img>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Topbar;
