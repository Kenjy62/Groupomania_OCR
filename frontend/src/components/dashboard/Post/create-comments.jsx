import React from "react";
import { useState, useContext } from "react";

// Context
import { InputCommentContext } from "../../../utils/context/input_comment";
import { PostContext } from "../../../utils/context/post";

function CreateComments(props) {
  const token = localStorage.getItem("token");

  // Context hide/show response input
  const { show, postId } = useContext(InputCommentContext);
  const { AddComment, success, error } = useContext(PostContext);

  // State Error, success
  const [response, setResponse] = useState();

  return (
    <>
      <div className="success" style={{ display: !success ? "none" : "block" }}>
        {success}
      </div>
      <div className="error" style={{ display: !error ? "none" : "block" }}>
        {error}
      </div>
      <div
        className="post--response"
        post-id={props.post._id}
        style={{
          display: props.post._id == postId && show === true ? "flex" : "none",
        }}
      >
        <input
          id="response"
          type="text"
          placeholder="Votre réponse..."
          onChange={(e) => setResponse(e.target.value)}
        />
        <button
          onClick={() =>
            AddComment(
              props.post._id,
              props.user.name,
              response,
              token,
              props.user.avatar
            )
          }
        >
          Répondre
        </button>
      </div>
    </>
  );
}

export default CreateComments;
