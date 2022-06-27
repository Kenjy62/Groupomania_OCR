import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";

function PostActions(props, user) {
    let post = props.props

    const [action, setAction] = useState()
    const [alreadyLiked, setAlreadyLiked] = useState(0)
    const [alreadyDisliked, setAlreadyDisliked] = useState(0)
    const [postId, setPostId] = useState()
    const [countLikes, setCountLikes] = useState(post.likes)
    const [countDislikes, setCountDislikes] = useState(post.dislikes)

    // Verify if already reaction by user
    useEffect(() => {
        let alreadyLiked = post.usersLiked.indexOf('test') > -1
        let alreadyDisliked = post.usersDisliked.indexOf('test') > -1
        if(alreadyLiked === true){
            setAlreadyLiked(1)
        } else if(alreadyDisliked === true) {
            setAlreadyDisliked(1)
        }
    }, [])

    // Post a reaction
    const isFirstRun = useRef(true)
    useEffect(() => {
        
            if(isFirstRun.current) {
                isFirstRun.current = false
                return;
            }

                if(action == -1 && alreadyLiked == 1){
                    alert('Aimer et ne pas aimer en même temps ?!')
                } else if(action == 1 && alreadyDisliked == 1){
                    alert('Aimer et ne pas aimer en même temps ?!')
                } else {
                    let data = {
                        name: props.user.name,
                        reaction: action
                    }
            
                    fetch('http://localhost:3000/api/post/test/' + postId, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify(data),
                        
                    }).then(res => {
                        if(res.status === 200){
                            if(action === 1){
                                setAlreadyLiked(1)
                                setCountLikes(countLikes + 1)
                            } else if(action === -1){
                                setAlreadyDisliked(1)
                                setCountDislikes(countDislikes + 1)
                            } else if(action === 0){
                                setAlreadyLiked(0)
                                setAlreadyDisliked(0)
                                const data = res.json()
                                data.then(data => {
                                    if(data.state == 'like'){
                                        setCountLikes(countLikes - 1)
                                    } else if(data.state == 'dislike'){
                                        setCountDislikes(countDislikes - 1)
                                    }
                                })
                            }
                        }
                    })
                }
    }, [postId, action])



    return (
        <>
            <div id={post._id} className="post--details--content--actions">
                <span>Commenter</span>
                <span>Commentaires ({post.comments.length})</span>
                <span value={alreadyLiked == 1? '0' : '1'} onClick={() => 
                    {setAction(alreadyLiked == 1? 0 : 1); 
                    setPostId(post._id)}}> {alreadyLiked == 1? <i className="fa-solid fa-thumbs-up" style={{color: 'green'}}></i> : <i className="fa-regular fa-thumbs-up" style={{color: 'green'}}></i>} ({countLikes})</span>
                <span value={alreadyDisliked == 1? '0' : '-1'}onClick={() => 
                    {setAction(alreadyDisliked == 1? 0 : -1); 
                    setPostId(post._id)}}> {alreadyDisliked == 1? <i style={{color: 'red'}} className="fa-solid fa-thumbs-down"></i> : <i style={{color: 'red'}} className="fa-regular fa-thumbs-down"></i>} ({countDislikes})</span>
        </div>
        </>
    )
}

export default PostActions