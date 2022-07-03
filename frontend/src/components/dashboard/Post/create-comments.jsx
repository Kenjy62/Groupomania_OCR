import React from "react";
import { useState } from "react";

function CreateComments(props) {

    const [response, setResponse] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const addComment = () => {
        if(!response){
            setError(`Impossible d'envoyer un message vide.`)
            setTimeout(() => {
                setError(undefined)
            }, 3000)
        } else {
            let data = {
                postId: props.post._id,
                author: props.user.name,
                text: response
            }
    
            fetch('http://localhost:3000/api/post/comments/add', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body : JSON.stringify(data)
            }).then(res => {
                if(res.status === 200){
                    setError(undefined)
                    setSuccess('Réponse envoyées')
                    let input = document.querySelector('input#response')
                    input.value = ''
                    setTimeout(() => {
                        setSuccess(undefined)
                    },3000)
                } else {
                    // error
                }
            })
        }
    }

    return (
        <>
            <div className="success" style={{display: !success? 'none' : 'block'}}>{success}</div>
            <div className="error" style={{display: !error? 'none' : 'block'}}>{error}</div>
            <div className="post--response" post-id={props.post._id}>
                <input id="response" type="text" placeholder="Votre réponse..." onChange={(e) => setResponse(e.target.value)}/>
                <button onClick={() => addComment()}>Répondre</button>
            </div>
        </>
    )
}

export default CreateComments;