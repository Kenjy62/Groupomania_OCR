import React from 'react';
import { useState, useEffect } from 'react';
import PostList from '../dashboard/Post/items';

function Main() {

    // Convert URL for getting user profil name
    var url = window.location.href
    url = url.split('/')
    url = url[4]
    
    const token = localStorage.getItem('token')
    const [user, setUser] = useState()
    const [post, setPost] = useState()

    const [isLoading, setIsLoading] = useState(false)

    // Fetch UserData
    useEffect(()=> {
        if(!user){
        fetch('http://localhost:3000/api/auth/profil/' + url, {
            method: 'GET', 
            headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            }).then(res => {
            if(res.status === 200){
                const data = res.json()
                data.then(json => {
                let dataParse = json.message
                console.log(dataParse)
                setUser(dataParse)
                })
            }
            })
        }
    }, [])

    useEffect(() => {
        if(!post){
            fetch('http://localhost:3000/api/post/' + url, {
                method: 'GET', 
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    },
            }).then(res => {
                if(res.status === 200){
                    const data = res.json()
                    data.then(data => {
                        console.log(data)
                        if(data.post != 'Aucun post pour le moment'){
                            setPost(data.post)
                        } else if(data.post == 'Aucun post pour le moment') {
                            setPost(false)                            
                        }

                        if(!user && !post){
                            console.log(user)
                            console.log(post)
                            setIsLoading(true)
                        }
                    })
                }
            })
        }
        console.log(post)
    }, [])
    
    return (
        <main>
            <div id="wrapper">
               {isLoading == false? <div style={{display: 'flex', justifyContent: 'center'}}><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : <>{!user? null : <h1>{user.name} {user.lastName}'s Profil</h1>} {post === false? 'Aucun post pour le moment...' : <PostList key={Math.random()} item={post} data={user}/>} </>}
            </div>
        </main>
     );
}

export default Main;

// Add Footer after Post