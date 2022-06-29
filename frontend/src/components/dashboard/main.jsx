import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

// Components
import Form from './Form/form';
import Post from './Post/posts';
import Edit from './Post/edit';

function Main(props) {

    const [editPost, setEditPost] = useState();
    const [originalPost, setOriginalPost] = useState()
    const [updatePost, setUpdatePost] = useState(null)

    const test2 = (data) => {
        setUpdatePost(data)
    }

    function PostEdit(data){
        setOriginalPost(data)
    }

    const isLoad = useRef(true)

    useEffect(() => {
        if(isLoad.current){
            isLoad.current = false
            return;
        }
        document.getElementById('voiler').style.display = 'flex'
        setEditPost(originalPost)
    },[originalPost])

    return (<>
        <div id='voiler'>
        {originalPost?  <Edit originalPost={originalPost} updateFunc={test2} />: 'nop'}
        </div>
        <main>
            <Form data={props.data}/>
            <Post data={props.data} editFunc={PostEdit} parentState={updatePost}/>
        </main></>
     );
}

export default Main;

// Add Footer after Post