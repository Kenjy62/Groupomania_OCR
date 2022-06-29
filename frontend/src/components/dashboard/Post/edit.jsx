import React from "react";
import { useState } from "react";

function Edit(props){

    console.log(props.originalPost)

    const [postUpdate, setPostUpdate] = useState({
        text: props.originalPost.text,
        imageUrl: props.originalPost.imageUrl
    })

    const deleteImage = () => {
        setPostUpdate({ text: postUpdate.text, imageUrl : ''})
    }

    const test = () => {
        if(postUpdate != undefined){
           if(postUpdate.text != props.originalPost.text || postUpdate.imageUrl != props.originalPost.imageUrl){
                if(postUpdate.text != ''){
                    let file = document.getElementById('postImageFile')
                    let formData = new FormData()
                    formData.append('text', postUpdate.text)
                    formData.append('image', file.files[0]? file.files[0] : null)

                    console.log(formData)
                    // API UPDATE
                    fetch('http://localhost:3000/api/post/' + props.originalPost._id + '/update', {
                        method: 'POST',
                        body:  formData,
                        headers: {
                          'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(res => {
                        if(res.status === 200){
                            let newtext = postUpdate.text
                            let newImg = postUpdate.imageUrl
                            console.log('UPDATE')
                            let div = document.getElementById(props.originalPost._id)
                            div.parentElement.firstChild.textContent = newtext
                            document.getElementById('voiler').style.display = 'none'
                            props.updateFunc(props.originalPost._id)
                        } else {
                            console.log('error')
                        }
                    })
                } else {
                    console.log('noppppp')
                }
           } else {
            console.log('nnop')
           }
        } else {
            console.log('undefined')
        }
      }

    return (
        <>
            <div className='postEdit'>
                <textarea placeholder={props.originalPost.text} defaultValue={props.originalPost.text} onChange={e => setPostUpdate({text : e.target.value, imageUrl: props.originalPost.imageUrl})}></textarea>
                <div className="postImage">
                    <img src={props.originalPost.imageUrl}></img>
                </div>
                <span onClick={() => {deleteImage()}}>Supprimer l'image</span>
                <input type="file" id="postImageFile" onChange={() => setPostUpdate({text: postUpdate.text, imageUrl: 'new'})}></input>
                <button onClick={() => test()}>test</button>
            </div>
        </>
    )
}

export default Edit