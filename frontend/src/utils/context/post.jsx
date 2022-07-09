import { createContext, useState, useContext } from "react";
import { PopupContext } from "./popup";

export const PostContext = createContext();
export const UserContext = createContext();

export const PostProvider = ({ children }) => {
  const { callUpdate, togglePopup } = useContext(PopupContext);
  const [feed, setFeed] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [post, setPost] = useState();
  const [newComment, setNewComment] = useState();

  // Load Feed
  const LoadAllPost = (skipParams) => {
    fetch("http://localhost:3000/api/post/" + skipParams + "/10", {
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

      fetch("http://localhost:3000/api/post/comments/add", {
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

    fetch("http://localhost:3000/api/post/comments/delete/" + postId, {
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
    fetch("http://localhost:3000/api/post/test2/details/" + postid, {
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
    fetch("http://localhost:3000/api/post/" + postId + "/delete", {
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
