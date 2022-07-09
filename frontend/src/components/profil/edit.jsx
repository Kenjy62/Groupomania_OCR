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

  const { UpdateProfil } = useContext(UserContext);
  const { togglePopup } = useContext(PopupContext);

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
      <div className="editProfil--background--image">
        <div className="postImage--action" style={{ zIndex: "999999" }}>
          <label
            style={{ color: "black" }}
            for="coverImage"
            className="postImage--action--items"
          >
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
        <img id="cover" src={props.user ? props.user.cover : null}></img>
      </div>
      <div className="editProfil--avatar">
        <div className="postImage--action" style={{ zIndex: "999999" }}>
          <label
            style={{ color: "black" }}
            for="avatarImage"
            className="postImage--action--items"
          >
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
            id="avatarImage"
            onChange={(e) => setAvatar(e.target.files[0])}
          ></input>
        </div>
        <img id="avatar" src={props.user ? props.user.avatar : null}></img>
      </div>
      <div classNName="editProfil--user--infos"></div>
      <button onClick={(e) => UpdateProfil(e, props.user, token)}>
        Sauvegarder les changements
      </button>
    </div>
  );
}

export default EditProfil;
