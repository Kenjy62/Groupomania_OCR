import { useEffect, useState } from 'react'
import '../../../styles/dashboard.css'
import ReactDOM from 'react-dom';

import PostList from './items';

function Posts(props) {
  const user = props.data
  const [skip, setSkip] = useState(0);
  const [postFeed, setPostFeed] = useState();

  const test = () => {
    setSkip(skip + 10)
  }

  useEffect(() => {
      fetch('http://localhost:3000/api/post/' + skip + '/10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status === 200){
        const postList = res.json()
        postList.then(post => {
          if(skip > 0){
            setPostFeed(postFeed => [...postFeed, ...post])
          } else if(skip === 0){
            setPostFeed(post)
          }
        }
    )}
    })
  }, [skip])

  return (
    <>
        <div id="post--feed">
           {postFeed? <PostList key={Math.random()} item={postFeed} data={user}/> : 'load'}
        </div>
        <button onClick={() => test()}>More</button>
    </>
  )
}
  
export default Posts;