import { createContext, useState, useContext } from "react";
import { PopupContext } from "./popup";
import burl from "../api";

export const PostContext = createContext();
export const UserContext = createContext();

export const PostProvider = ({ children }) => {
  const { callUpdate, togglePopup } = useContext(PopupContext);
  const [feed, setFeed] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [post, setPost] = useState();
  const [newComment, setNewComment] = useState();
  const [postHistory, setPostHistory] = useState();

  // Load Feed
  const LoadAllPost = (skipParams) => {
    fetch(burl + "/post/" + skipParams + "/10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        const postList = res.json();
        postList.then((post) => {
          if (post.length > 0) {
            if (skipParams > 0) {
              setFeed((feed) => [...feed, ...post]);
              return setFeed;
            } else if (skipParams === 0) {
              setFeed(post);
              return setFeed;
            }
          } else {
            document.querySelector(
              "button.seeMorePost"
            ).textContent = `Fin de l'historique`;
          }
        });
      }
    });
  };

  // Add a comment
  const AddComment = (postId, user, data, token, avatar) => {
    console.log("here");
    if (!data) {
      setError(`Impossible d'envoyer un message vide.`);
      setTimeout(() => {
        setError(undefined);
      }, 3000);
    } else {
      let object = {
        postId: postId,
        author: user,
        text: data,
        avatar: avatar,
      };

      fetch(burl + "/post/comments/add", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(object),
      }).then((res) => {
        if (res.status === 200) {
          setError(undefined);
          setSuccess("Réponse envoyées");
          let input = document.querySelector("input#response");
          input.value = "";
          setNewComment(Math.random());
          setTimeout(() => {
            setSuccess(undefined);
          }, 3000);
        } else {
          // error
        }
      });
    }
  };

  // Delete a comments on a post
  const DeleteComment = (postId, token, id) => {
    let data = {
      id: id,
    };

    fetch(burl + "/post/comments/delete/" + postId, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        callUpdate(Math.random());
      }
    });
  };

  // Get all comments of a specific post
  const GetComments = (postid, token) => {
    fetch(burl + "/post/test2/details/" + postid, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((item) => {
          console.log(item);
          setPost(item.data);
          return post;
        });
      }
    });
  };

  // Delete a post (user or admin)
  const DeletePost = (postId) => {
    fetch(burl + "/post/" + postId + "/delete", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200) {
        callUpdate(Math.random());
      } else {
        console.log("error");
      }
    });
  };

  // Create a post
  const CreatePost = (e, user) => {
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
      formData.append("author", user.name);
      formData.append("text", text);
      formData.append("image", file.files[0] ? file.files[0] : null);

      fetch(burl + "/post/add", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.status == 201) {
          const data = res.json();
          data.then(() => {
            togglePopup(false);
            callUpdate(Math.random());
          });
        }
      });
    }
  };

  // Edit Post
  const EditPost = (postUpdate, originalPost, user) => {
    let textareaPost = document.getElementById("textareaPost");
    postUpdate.text = textareaPost.value;

    console.log(postUpdate);

    if (postUpdate) {
      if (
        postUpdate.text != originalPost.text ||
        postUpdate.imageUrl != originalPost.imageUrl
      ) {
        if (postUpdate.text) {
          let file = document.getElementById("postImageFile");

          // Form Data
          let formData = new FormData();
          formData.append("text", postUpdate.text);
          formData.append("user", user);

          if (postUpdate.imageUrl === "new") {
            formData.append("image", file.files[0]);
          } else if (postUpdate.imageUrl === "remove") {
            formData.append("imageState", null);
          } else if (postUpdate.imageUrl === originalPost.imageUrl) {
            formData.append("imageState", "same");
          }

          // API UPDATE
          fetch(burl + "/post/" + originalPost._id + "/update", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then((res) => {
            if (res.status === 200) {
              togglePopup(false);
              callUpdate(Math.random());
            } else {
              setError("Une erreur est survenue.");
            }
          });
        } else {
          setError("Il n'y à pas de texte dans le champs correspondant.");
        }
      } else {
        setError("Le poste est identique ");
      }
    } else {
      setError("Le poste est identique ");
    }
  };

  // Get History Post
  const HistoryPost = (postId) => {
    fetch(burl + "/history/" + postId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200) {
        const data = res.json();
        data.then((item) => {
          console.log(item);
          setPostHistory(item.result);
          return postHistory;
        });
      }
    });
  };

  return (
    <PostContext.Provider
      value={{
        LoadAllPost,
        feed,
        AddComment,
        success,
        error,
        GetComments,
        post,
        newComment,
        DeleteComment,
        DeletePost,
        CreatePost,
        EditPost,
        postHistory,
        HistoryPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
