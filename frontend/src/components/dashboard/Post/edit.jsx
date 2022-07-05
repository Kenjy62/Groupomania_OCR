import React from "react";
import { useState, useEffect, useContext } from "react";

import { PopupContext } from "../../../utils/context/popup";

function Edit(props) {
  // Close popup
  const { togglePopup, callUpdate } = useContext(PopupContext);

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
    setPostUpdate({ text: postUpdate.text, imageUrl: "remove" });
  };

  const test = () => {
    if (postUpdate != undefined) {
      if (
        postUpdate.text != props.originalPost.text ||
        postUpdate.imageUrl != props.originalPost.imageUrl
      ) {
        if (postUpdate.text != "") {
          let file = document.getElementById("postImageFile");
          let formData = new FormData();
          formData.append("text", postUpdate.text);

          if (postUpdate.imageUrl === "new") {
            formData.append("image", file.files[0]);
          } else if (postUpdate.imageUrl === "remove") {
            formData.append("image", "");
          }

          // API UPDATE
          fetch(
            "http://localhost:3000/api/post/" +
              props.originalPost._id +
              "/update",
            {
              method: "POST",
              body: formData,
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          ).then((res) => {
            if (res.status === 200) {
              console.log("UPDATE");
              /* let div = document.getElementById(props.originalPost._id)
                            div.parentElement.firstChild.textContent = newtext */
              document.getElementById("voiler").style.display = "none";
              callUpdate(Math.random());
            } else {
              console.log("error");
            }
          });
        } else {
          console.log("noppppp");
        }
      } else {
        console.log("nnop");
      }
    } else {
      console.log("undefined");
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
        <textarea
          placeholder={props.originalPost.text}
          defaultValue={props.originalPost.text}
          onChange={(e) =>
            setPostUpdate({
              text: e.target.value,
              imageUrl: props.originalPost.imageUrl,
            })
          }
        ></textarea>
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
        <button style={{ marginTop: 15 }} onClick={() => test()}>
          Modifier
        </button>
      </div>
    </>
  );
}

export default Edit;
