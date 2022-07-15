// Require
import React from "react";
import { useEffect, useState, useContext } from "react";

// Style
import "../../styles/profil.css";

// Provider
import { UserContext } from "../../utils/context/user";
import { PopupContext } from "../../utils/context/popup";

function EditProfil(props) {
  console.log(props);

  // Token
  const token = localStorage.getItem("token");

  // Context
  const { UpdateProfil } = useContext(UserContext);
  const { togglePopup } = useContext(PopupContext);

  // State
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();

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
      <div
        onClick={() => {
          togglePopup();
        }}
        className="popup--close"
      >
        <i class="fa-solid fa-xmark"></i>
      </div>
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
          src={props.user ? props.user.cover : null}
          onError={(e) => (
            e.target.onError == null,
            (e.target.src = "http://localhost:3000/images/default-cover.jpg")
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
          src={props.user ? props.user.avatar : null}
          onError={(e) => (
            (e.target.onError = null),
            (e.target.src = "http://localhost:3000/images/default.png")
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
