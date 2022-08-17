// Dependencies
import React from "react";
import { useState, useEffect, useContext } from "react";

// Provider
import { PostContext } from "../../../utils/context/post";

// Utils
import burl from "../../../utils/api";

// Components
import ClosePopup from "../../global/close-popup";

// Render Page
function Edit(props) {
  // Close popup
  const { EditPost, error } = useContext(PostContext);

  // Edit Popup
  const [postUpdate, setPostUpdate] = useState({
    text: props.originalPost.text,
    imageUrl: props.originalPost.imageUrl,
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
    let InputFile = document.getElementById("postImageFile");
    InputFile.value = null;
    setPostUpdate({ text: postUpdate.text, imageUrl: "remove" });
  };

  return (
    <>
      <div className="postEdit">
        <ClosePopup />

        <div className="error" style={{ display: error ? "block" : "none" }}>
          {error}
        </div>

        <textarea
          id="textareaPost"
          placeholder={props.originalPost.text}
          defaultValue={props.originalPost.text}
        ></textarea>

        <div className="postImage">
          {postUpdate.imageUrl ? (
            <img
              alt="Post Pic"
              id="post--edit--preview"
              src={burl + postUpdate.imageUrl}
            ></img>
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
        <button
          style={{ marginTop: 15 }}
          onClick={() =>
            EditPost(postUpdate, props.originalPost, props.user.name)
          }
        >
          Modifier
        </button>
      </div>
    </>
  );
}

export default Edit;
