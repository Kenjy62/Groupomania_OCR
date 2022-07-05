import React from "react";
import { useState, useEffect, useContext } from "react";

// Provider
import { PopupContext } from "../../../utils/context/popup";

function Create(props) {
  const [error, setError] = useState();

  // Close popup
  const { togglePopup, isOpen } = useContext(PopupContext);
  const { callUpdate, update } = useContext(PopupContext);

  // Edit Popup
  const [postUpdate, setPostUpdate] = useState({
    text: undefined,
    imageUrl: undefined,
  });

  // Image preview on edit post
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (preview != null) {
      document.getElementById("post--edit--preview").src =
        URL.createObjectURL(preview);
    }
  }, [preview]);

  // Delete image
  const deleteImage = () => {
    setPostUpdate({ text: postUpdate.text, imageUrl: undefined });
  };

  /* Create Post */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let text = document.getElementById("post--text").value;
    let file = document.getElementById("postImageFile");

    if (!text) {
      setError("On ne publie pas de message vide.");
      setTimeout(() => {
        setError(undefined);
      }, 5000);
    } else {
      let formData = new FormData();
      formData.append("author", props.user.name);
      formData.append("text", text);
      formData.append("image", file.files[0] ? file.files[0] : null);

      fetch("http://localhost:3000/api/post/add", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.status == 201) {
          const data = res.json();
          data.then((data) => {
            let toPreview = {
              name: props.user.name,
              text: text,
              imageUrl: data.imageUrl,
            };
            document.getElementById("voiler").style.display = "none";
            callUpdate(Math.random());
          });
        }
      });
    }
  };

  return (
    <>
      <div className="postEdit">
        <div
          onClick={() => {
            togglePopup();
          }}
          className="popup--close"
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
        <textarea id="post--text" placeholder="Quoi de neuf?"></textarea>
        <div className="postImage">
          {postUpdate.imageUrl ? (
            <img id="post--edit--preview" src={postUpdate.imageUrl}></img>
          ) : null}
          <div className="postImage--action">
            <label
              style={{ color: "black" }}
              for="postImageFile"
              className="postImage--action--items"
            >
              <i class="fa-solid fa-image"></i>
            </label>
            {!postUpdate.imageUrl ? null : (
              <label
                onClick={() => {
                  deleteImage();
                }}
                className="postImage--action--items"
              >
                <i class="fa-solid fa-trash"></i>
              </label>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              id="postImageFile"
              onChange={(e) => {
                setPostUpdate({ text: postUpdate.text, imageUrl: "new" });
                setPreview(e.target.files[0]);
              }}
            ></input>
          </div>
        </div>
        <button style={{ marginTop: 15 }} onClick={(e) => handleSubmit(e)}>
          Créer le post
        </button>
      </div>
    </>
  );
}

export default Create;
