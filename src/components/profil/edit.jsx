// Require
import React from "react";
import { useEffect, useState, useContext } from "react";

// Style
import "../../styles/profil.css";

// Provider
import { UserContext } from "../../utils/context/user";

// Utils
import burl from "../../utils/api";

// Components
import ClosePopup from "../global/close-popup";

// Render Page
function EditProfil(props) {
  // Token
  const token = localStorage.getItem("token");

  // Context
  const { UpdateProfil } = useContext(UserContext);

  // State
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();

  // Preview Avatar and Cover
  useEffect(() => {
    if (cover) {
      document.getElementById("cover").src = URL.createObjectURL(cover);
    }

    if (avatar) {
      document.getElementById("avatar").src = URL.createObjectURL(avatar);
    }
  }, [cover, avatar]);

  return (
    <div className="editProfil">
      <ClosePopup />
      <div className="editProfil--background--image">
        <div className="postImage--action" style={{ zIndex: "999999" }}>
          <label for="coverImage" className="postImage--action--items">
            <i class="fa-solid fa-image"></i>
          </label>
          <label
            className="postImage--action--items"
            onClick={() => setCover(props.user.cover)}
          >
            <i class="fa-solid fa-trash"></i>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="coverImage"
            onChange={(e) => setCover(e.target.files[0])}
          ></input>
        </div>
        <img
          alt="Avatar"
          id="cover"
          src={props.user ? burl + props.user.cover : null}
          onError={(e) => (
            e.target.onError == null,
            (e.target.src = burl + `/images/default-cover.jpg`)
          )}
        ></img>
      </div>
      <div className="editProfil--avatar">
        <div className="postImage--action" style={{ zIndex: "999999" }}>
          <label
            style={{ width: 30, height: 30 }}
            for="avatarImage"
            className="postImage--action--items"
          >
            <i class="fa-solid fa-image"></i>
          </label>
          <label
            style={{ width: 30, height: 30 }}
            className="postImage--action--items"
            onClick={() => setCover(props.user.cover)}
          >
            <i class="fa-solid fa-trash"></i>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="avatarImage"
            onChange={(e) => setAvatar(e.target.files[0])}
          ></input>
        </div>
        <img
          alt="Avatar"
          id="avatar"
          src={props.user ? burl + props.user.avatar : null}
          onError={(e) => (
            (e.target.onError = null),
            (e.target.src = burl + `/images/default-avatar.png`)
          )}
        ></img>
      </div>
      <div classNName="editProfil--user--infos"></div>
      <button onClick={(e) => UpdateProfil(e, props.user, token)}>
        Sauvegarder les changements
      </button>
    </div>
  );
}

export default EditProfil;
