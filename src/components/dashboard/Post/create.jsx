// Dependencies
import React from "react";
import { useState, useEffect, useContext } from "react";

// Provider
import { PostContext } from "../../../utils/context/post";

// Components
import ClosePopup from "../../global/close-popup";

// Render Page
function Create(props) {
  // Close popup
  const { CreatePost, error } = useContext(PostContext);

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
    let inputFile = document.getElementById("postImageFile");
    inputFile.value = null;
    setPostUpdate({ text: postUpdate.text, imageUrl: undefined });
  };

  return (
    <>
      <div className="postEdit">
        <ClosePopup />

        <div className="error" style={{ display: error ? "block" : "none" }}>
          {error}
        </div>

        <textarea id="post--text" placeholder="Quoi de neuf?"></textarea>

        <div className="postImage">
          {postUpdate.imageUrl ? (
            <img
              id="post--edit--preview"
              alt="Preview"
              src={postUpdate.imageUrl}
            ></img>
          ) : null}

          <div className="postImage--action">
            <label
              style={{ color: "black" }}
              for="postImageFile"
              className="postImage--action--items"
            >
              <i className="fa-solid fa-image"></i>
            </label>
            {!postUpdate.imageUrl ? null : (
              <label
                onClick={() => {
                  deleteImage();
                }}
                className="postImage--action--items"
              >
                <i className="fa-solid fa-trash"></i>
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

        <button
          style={{ marginTop: 15 }}
          onClick={(e) => CreatePost(e, props.user)}
        >
          Créer le post
        </button>
      </div>
    </>
  );
}

export default Create;
