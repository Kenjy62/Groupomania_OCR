import { useEffect, useState } from 'react'
import '../../../styles/dashboard.css'
import ReactDOM from 'react-dom';

import PostList from './items';

function Posts(props) {
  console.log(props)
  const user = props.data
  const [skip, setSkip] = useState(0);
  const [postFeed, setPostFeed] = useState();
  const [isEdited, setPostEdited] = useState(null)

  useEffect(() => {
    console.log('ok from post')
    setPostEdited(props.updateFunc)
  },[props.updateFunc])

  
  const test2 = () => {
    console.log('ok')
  }

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
          if(post.length > 0){
            if(skip > 0){
              setPostFeed(postFeed => [...postFeed, ...post])
            } else if(skip === 0){
              setPostFeed(post)
            }
          } else {
            document.querySelector('button.seeMorePost').textContent = `Fin de l'historique`
          } 
        }
    )}
    })
  }, [skip, isEdited])

  return (
    <>
        <div id="post--feed">
           {postFeed? 
            <PostList key={Math.random()} item={postFeed} data={user} EditFunc={props.editFunc} UpdateFunc={test2}/> : 
            <div style={{display: 'flex', justifyContent: 'center'}}><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
        </div>
        <div id="post--feed--bottom">
          <button className="seeMorePost" onClick={() => test()}>Voir plus d'ancien post</button>
        </div>
    </>
  )
}
  
export default Posts;