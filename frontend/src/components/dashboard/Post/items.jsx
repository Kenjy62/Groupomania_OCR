import React from "react";
import PostActions from "./actions";
import { Link } from 'react-router-dom'

const PostList = (props) => {

    // See response input
    const showResponse = (postId) => {
        let div = document.querySelector("[post-id='" + postId + "']")
        div.style.display = 'flex'
        console.log(div)
    }

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
                                <div className="post--details--content--details"><span>Nathan Anderson</span> <span><i class="fa-solid fa-hourglass"></i> 3 hours</span></div>
                                <div className="post--details--content--text">{post.text}</div>
                                {post.imageUrl != ''? <div className="post--details--content--image"><img src={post.imageUrl}></img></div> : null}
                                <PostActions props={post} user={props.data} key={key} editFunc={props.EditFunc} showResponse={showResponse} UpdateFunc={props.UpdateFunc}/>
                            </div>
                        </div>
                        <div className="post--details--comments" post-id={post._id}>
                            <div><form><input type="text" placeholder="Votre réponse..."></input></form>
                            <button type="submit">Répondre</button></div>
                        </div>
                    </>
                )
            })}
        </>)
    }
}
export default PostList;