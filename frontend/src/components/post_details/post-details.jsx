import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PostActions from "../dashboard/Post/actions";
import CreateComments from "../dashboard/Post/create-comments";
import PostComment from "./post_comment";

function PostDetails(props) {

    const [post, setPost] = useState()

    // Convert URL for getting user profil name
    var url = window.location.href
    url = url.split('/')
    url = url[4]

    // Token

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch('http://localhost:3000/api/post/' + url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then(res => {
            if(res.status === 200){
                const data = res.json()
                data.then(data => setPost(data.data))
            }
        })
    }, [])

    return(
            post?
                <>
                <div className="post" >
                    <div className="post--details--user">
                        <Link to={'/user/'+post.author}>
                            <div className="post--details--user--picture">
                                <img src="https://i.picsum.photos/id/599/200/200.jpg?hmac=2WLKs3sxIsaEQ-6WZaa6YMxgl6ZC4cNnid0aqupm2is"></img>
                            </div>
                        </Link>
                    </div>
                    <div className="post--details--content">
                        <div className="post--details--content--details"><span>{post.author}</span> <span><i class="fa-solid fa-hourglass"></i> 3 hours</span></div>
                        <div className="post--details--content--text">{post.text}</div>
                        {post.imageUrl != ''? <div className="post--details--content--image"><img src={post.imageUrl}></img></div> : null}
                        <PostActions props={post} user={props.data} editFunc={props.EditFunc} UpdateFunc={props.UpdateFunc}/>
                        <CreateComments post={post} user={props.data} />

                        {post.comments.map((post, key) => {
                            return (
                                <PostComment post={post}/>
                            )
                        })}
                        
                    </div>   
                </div>
            </> : null
    )
}

export default PostDetails