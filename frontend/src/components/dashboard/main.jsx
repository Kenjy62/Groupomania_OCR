import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

// Components
import Edit from './Post/edit';
import Global from '../../containers/global';

function Main(props) {

    const [editPost, setEditPost] = useState();
    const [originalPost, setOriginalPost] = useState()
    const [updatePost, setUpdatePost] = useState(null)
    
    const [isUpdate, setIsUpdate] = useState()

    const isUpdateFunc = (data) => {
        console.log('test')
        setIsUpdate(data)
    }

    const cancelUpdateFunc = () => {
        setOriginalPost(undefined)
    }

    function PostEdit(data){
        setOriginalPost(data)
    }

    const sendUpdate = (data) => {
       if(sendUpdate == false){

       } else {
        console.log('A post edited')
        isUpdateFunc(data)
        setOriginalPost(undefined) 
       }
    }

    const isLoad = useRef(true)

    useEffect(() => {
        if(isLoad.current){
            isLoad.current = false
            return;
        }
        if(originalPost != null){
            document.getElementById('voiler').style.display = 'flex'
            setEditPost(originalPost)
        }
    },[originalPost])

    return (<>
        
        {originalPost?  <div id='voiler'><Edit originalPost={originalPost} sendUpdate={sendUpdate}  cancelFunc={cancelUpdateFunc}/></div> : null}
        
        <main>
            <div className='topBar'>
                <div className='topBar--links'></div>
                <div className='topBar--search'>
                    <div className='topBar--search--icon'><i class="fa-solid fa-magnifying-glass"></i></div>
                    <input className='topBar--search--input' type="text" placeholder='Recherche une personne'></input>
                </div>
                <div className='topBar--user'>
                    <span>Hey, Nathan!</span>
                    <img src="https://i.picsum.photos/id/343/200/300.jpg?hmac=_7ttvLezG-XONDvp0ILwQCv50ivQa_oewm7m6xV2uZA"></img>
                </div>
            </div>
            <Global data={props.data} editFunc={PostEdit} updateFunc={isUpdate}/>
        </main></>
     );
}

export default Main;

// Add Footer after Post

/* 

<Form data={props.data}/>
            <Post data={props.data} editFunc={PostEdit} parentState={updatePost}/>
*/