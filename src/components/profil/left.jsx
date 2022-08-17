// Dependencies
import React from "react";
import { useContext } from "react";

// Components
import Loader from "../global/loader";

// Provider
import { PopupContext } from "../../utils/context/popup";
import { UserContext } from "../../utils/context/user";

// Utils
import burl from "../../utils/api";

// Render Page
function Left(props) {
  // Token
  const token = localStorage.getItem("token");

  // Url Converter
  var url = window.location.href;
  url = url.split("/");
  url = url[4];

  // Context
  const { togglePopup } = useContext(PopupContext);
  const { SetAdmin, deleteUser } = useContext(UserContext);

  return props.user ? (
    <div className="left">
      <div className="blocks">
        <div className="blocks--user--infos">
          <img
            alt={props.user.name + " Avatar"}
            src={props.user ? burl + props.user.avatar : <Loader />}
            onError={(e) => (
              (e.target.onError = null),
              (e.target.src = burl + `/images/default-avatar.png`)
            )}
          />
          <span>
            {props.user ? props.user.name + " " + props.user.lastName : null}
          </span>
          <span>
            {!props.user
              ? null
              : props.me.admin === true
              ? "Vous êtes admin"
              : null}
          </span>
          <span>Lille, France</span>
        </div>
        <div className="blocks--user--stats">
          <span style={{ color: "grey" }}>
            {props.user.postsCount > 1 ? "Posts" : "Post"} <br />
            <font style={{ color: "white" }}>{props.user.postsCount}</font>
          </span>
        </div>
      </div>

      {!props ? null : (props.user.name === props.me.name &&
          props.option === "profil") ||
        (props.me.admin === true && props.option === "profil") ? (
        <div className="blocks">
          <button
            onClick={() => togglePopup("edit_profil", props.user, props.me)}
          >
            Modifier le profil
          </button>
          {!props.me ? null : props.me.admin === true &&
            props.me.name !== url ? (
            <>
              <button
                onClick={() => deleteUser(props.me, props.user.name, token)}
              >
                Supprimer l'utilisateur
              </button>
              <button
                id="isAdmin"
                onClick={() => SetAdmin(props.user.name, token)}
              >
                {props.user.admin
                  ? "Retirer Administrateur"
                  : "Passer Administrateur"}
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
}

export default Left;
