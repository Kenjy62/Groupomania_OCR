import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

// Components
import Edit from "../../components/dashboard/Post/edit";
import Create from "../../components/dashboard/Post/create";
import Global from "../../containers/global";
import Topbar from "../global/topbar";

function Main(props) {
  const [editPost, setEditPost] = useState();
  const [originalPost, setOriginalPost] = useState();
  const [updatePost, setUpdatePost] = useState(null);
  const [createPost, setCreatePost] = useState(null);

  const [isUpdate, setIsUpdate] = useState();

  useEffect(() => {
    if (props.callOpenCreatePost) {
      setCreatePost(true);
    }
  }, [props.callOpenCreatePost]);

  const isUpdateFunc = (data) => {
    setIsUpdate(data);
  };

  const cancelUpdateFunc = () => {
    setOriginalPost(undefined);
    setCreatePost(undefined);
  };

  function PostEdit(data) {
    setOriginalPost(data);
  }

  const sendUpdate = (data) => {
    if (sendUpdate == false) {
    } else {
      isUpdateFunc(data);
      setOriginalPost(undefined);
    }
  };

  const isLoad = useRef(true);

  useEffect(() => {
    if (isLoad.current) {
      isLoad.current = false;
      return;
    }
    if (originalPost != null) {
      document.getElementById("voiler").style.display = "flex";
      setEditPost(originalPost);
    }
  }, [originalPost]);

  useEffect(() => {
    if (isLoad.current) {
      isLoad.current = false;
      return;
    }
    if (createPost != null) {
      document.getElementById("voiler").style.display = "flex";
    }
  }, [createPost]);

  return (
    <>
      {originalPost ? (
        <div id="voiler">
          <Edit
            originalPost={originalPost}
            sendUpdate={sendUpdate}
            cancelFunc={cancelUpdateFunc}
          />
        </div>
      ) : null}
      {createPost ? (
        <div id="voiler">
          <Create
            user={props.data}
            cancelFunc={cancelUpdateFunc}
            sendUpdate={sendUpdate}
          ></Create>
        </div>
      ) : null}
      <main>
        <Topbar user={props.user} />
        <Global user={props.user} option="details" />
      </main>
    </>
  );
}

export default Main;

// Add Footer after Post

/* 

<Form data={props.data}/>
            <Post data={props.data} editFunc={PostEdit} parentState={updatePost}/>
*/
