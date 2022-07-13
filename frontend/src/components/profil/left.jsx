// Dependencies
import React from "react";
import { useContext } from "react";

// Components
import Loader from "../global/loader";

// Provider
import { PopupContext } from "../../utils/context/popup";
import { UserContext } from "../../utils/context/user";

function Left(props) {
  const token = localStorage.getItem("token");

  var url = window.location.href;
  url = url.split("/");
  url = url[4];

  const { togglePopup } = useContext(PopupContext);
  const { SetAdmin } = useContext(UserContext);

  return props.user ? (
    <div className="left">
      <div className="blocks">
        <div className="blocks--user--infos">
          <img
            src={props.user ? props.user.avatar : <Loader />}
            onError={(e) => (
              (e.target.onError = null),
              (e.target.src = "http://localhost:3000/images/default.png")
            )}
          />
          <span>
            {props.user ? props.user.name + " " + props.user.lastName : null}
          </span>
          <span>
            {!props.user
              ? null
              : props.user.admin === true
              ? "Vous êtes admin"
              : null}
          </span>
          <span style={{ color: "grey" }}>@andersonN</span>
          <span>Lille, France</span>
        </div>
        <div className="blocks--user--stats">
          <span style={{ color: "grey" }}>
            Posts <br /> <font style={{ color: "white" }}>147</font>
          </span>
          <span style={{ color: "grey" }}>
            Abonnés <br /> <font style={{ color: "white" }}>5</font>
          </span>
          <span style={{ color: "grey" }}>
            Abonnement <br /> <font style={{ color: "white" }}>15</font>
          </span>
        </div>
      </div>

      {!props ? null : (props.user.name === props.me.name &&
          props.option === "profil") ||
        (props.me.admin === true && props.option != "feed") ? (
        <div className="blocks">
          <button
            onClick={() => togglePopup("edit_profil", props.user, props.me)}
          >
            Modifier le profil
          </button>
          {!props.me ? null : props.me.admin === true ? (
            <>
              <button>Supprimer l'utilisateur</button>
              <button onClick={() => SetAdmin(props.user.name, token)}>
                Promouvoir Admin
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
}

export default Left;
