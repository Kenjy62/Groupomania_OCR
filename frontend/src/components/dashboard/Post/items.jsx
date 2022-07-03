import React from "react";
import PostActions from "./actions";
import CreateComments from "./create-comments";
import { Link } from 'react-router-dom'
import { useState } from "react";

const PostList = (props) => {

    var old = null;

    const visibility = (postId) => {
       if(old != null){
        let div = document.querySelector("[post-id='" + old + "']")
        div.style.display = 'none'
        let div2 = document.querySelector("[post-id='" + postId + "']")
        div2.style.display = 'flex'
        old = postId;
       } else {
        let div = document.querySelector("[post-id='" + postId + "']")
        div.style.display = 'flex'
        old = postId;
       }
    }

    if(!props.item){
        return (<h1>load</h1>)
    } else {
        if(props.item.length === 0){
            return (<h1>test</h1>)
        } else {
            return (<>
                {props.item.map((post, key) => {
                    return (
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
                                    <PostActions props={post} user={props.data} key={key} editFunc={props.EditFunc} UpdateFunc={props.UpdateFunc} isVisible={visibility}/>
                                    <CreateComments post={post} user={props.data} />
                                </div>
                            </div>
                        </>
                    )
                })}
            </>)
        }
    }
}
export default PostList;