import React from "react";
import PostActions from "./actions";
import { Link } from 'react-router-dom'

const PostList = (props) => {

    console.log(props)

    if(props.item.length === 0){
        return (<h1>test</h1>)
    } else {
        return (<>
            {props.item.map((post, key) => {
                return (
                    <>
                        <div className="post" >
                            <div className="post--details--user">
                                <Link to={'/user/'+post.author}><img src="https://i.picsum.photos/id/599/200/200.jpg?hmac=2WLKs3sxIsaEQ-6WZaa6YMxgl6ZC4cNnid0aqupm2is"></img></Link>
                            </div>
                            <div className="post--details--content">
                                <div className="post--details--content--text">{post.text}</div>
                                {post.imageUrl != ''? <div className="post--details--content--image"><img src={post.imageUrl}></img></div> : null}
                                <PostActions props={post} user={props.data} key={key} editFunc={props.EditFunc}/>
                            </div>
                        </div>
                    </>
                )
            })}
        </>)
    }
}
export default PostList;