// Dependencies
import React from "react";
import { useContext } from "react";

// Components
import Edit from "./Post/edit";
import Create from "./Post/create";
import Global from "../../containers/global";
import Topbar from "../global/topbar";
import EditProfil from "../profil/edit";
import Loader from "../global/loader";
import History from "./Post/history";

// Provider
import { PopupContext } from "../../utils/context/popup";

// Render Page
function Main(props) {
  // Context
  const { isOpen, option, data } = useContext(PopupContext);

  return (
    <>
      {/* Voiler, Popup Center Screen (z-index -> 99999999) */}
      {isOpen ? (
        <div
          id="voiler"
          style={{ display: isOpen ? "flex" : "none", zIndex: "10" }}
        >
          {option === "create" ? (
            <Create user={props.user} />
          ) : option === "edit_post" ? (
            <Edit originalPost={data} user={props.user} />
          ) : option === "edit_profil" ? (
            <EditProfil user={data} />
          ) : option === "post_history" ? (
            <History />
          ) : null}
        </div>
      ) : null}

      <main>
        <Topbar user={props.user} />
        {props.user ? (
          <Global
            option={props.option}
            user={props.user}
            LastUser={props.LastUser}
            TopPost={props.TopPost}
          />
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}

export default Main;
