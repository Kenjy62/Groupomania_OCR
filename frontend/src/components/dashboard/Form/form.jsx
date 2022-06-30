// Import Dependences
import React from 'react'
import { useState, useEffect } from 'react';

// Components

// Functions 
import { postPreview } from './functions/create-post'

function PostForm(props) {

    // State
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState()

    // Image Preview
    useEffect(() => {
        if(preview != null){
          document.getElementById('post--details--image--preview').src = URL.createObjectURL(preview)

        }
      }, [preview]) 

    /* AutoHeight Textarea */
    useEffect(() => {
      let textarea = document.getElementById('post--content')
      textarea.addEventListener('keyup', function(){
        this.style.height = "1px";
        this.style.height = (25+this.scrollHeight)+"px";
      })
    })

    /* Create Post */
    const handleSubmit = async e => {
      e.preventDefault();
      let text = document.getElementById('post--content').value
      let file = document.getElementById('post--image')

      if(!text){
        setError('On ne publie pas de message vide.')
        setTimeout(() => {
          setError(undefined)
        }, 5000)
      } else {
        let formData = new FormData()
        formData.append('author', props.data.name)
        formData.append('text', text)
        formData.append('image', file.files[0]? file.files[0] : null)
        
        fetch('http://localhost:3000/api/post/add', {
            method: 'POST',
            body:  formData,
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }).then(res => {
            if(res.status == 201){
              const data = res.json()
              data.then((data) => {
                let toPreview = {
                  name: props.data.name,
                  text: text,
                  imageUrl: data.imageUrl
                }
                postPreview(toPreview)
              }) 
          }
        })
      }
     
     
    }

    return ( 
      <div id="wrapper">
        <div class="error" style={{display : error? 'block' : 'none'}}>{error}</div>
        <div className='post--write'>
          <form method='POST' encType='multipart/form-data' id="post--form" onSubmit={handleSubmit}>
              <input id="post--image" style={{ display: 'none' }} type='file' onChange={e => setPreview(e.target.files[0])}></input>
              <textarea id="post--content" placeholder="Quoi de neuf aujourd'hui?"></textarea>
              <div className="post--details">
                  <div className='post--details--action'>
                      <button  style={{height: 59}} type="submit">Publier</button>
                      <div className="button" for="post--image"><label id="labelForImage" for="post--image">Ajouter une image</label></div>
                </div>
              </div>
          </form>
          {preview? <div className="post--details--image">
                <img id="post--details--image--preview" style={preview != null ? { display: 'block' } : { display: 'none' }} src={preview != null ? { preview } : ''}></img>
              </div> : null}
        </div>
      </div>
     );
}


export default PostForm


/* <div id="wrapper">
        <div class="error" style={{display : error? 'block' : 'none'}}>{error}</div>
        <div className='post--write'>
          <form method='POST' encType='multipart/form-data' id="post--form" onSubmit={handleSubmit}>
              <input id="post--image" style={{ display: 'none' }} type='file' onChange={e => setPreview(e.target.files[0])}></input>
              <textarea id="post--content" placeholder="Quoi de neuf aujourd'hui?"></textarea>
              <div className="post--details">
                  <div className='post--details--action'>
                      <button  style={{height: 59}} type="submit">Publier</button>
                      <div className="button" for="post--image"><label id="labelForImage" for="post--image">Ajouter une image</label></div>
                </div>
              </div>
          </form>
          {preview? <div className="post--details--image">
                <img id="post--details--image--preview" style={preview != null ? { display: 'block' } : { display: 'none' }} src={preview != null ? { preview } : ''}></img>
              </div> : null}
        </div>
      </div> */