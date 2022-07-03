import React from "react";

function PostComment(props) {
    return (
        <div className="post--details--comments--list">
            <div className="post--details--comments--list--user">
                <img src="https://picsum.photos/536/354"></img>
            </div>
            <div className="post--details--comments--list--content">
                <div className="post--details--content--details"><span>{props.post.author}</span> <span><i class="fa-solid fa-hourglass"></i> 3 hours</span></div>
                <div className="post--details--content--text">{props.post.text}</div>
            </div>
        </div>
    )
}

export default PostComment