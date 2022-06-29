import React from 'react';
import { useState, useEffect } from 'react';

function Main() {

    // Convert URL for getting user profil name
    var url = window.location.href
    url = url.split('/')
    url = url[4]
    
    const token = localStorage.getItem('token')
    const [user, setUser] = useState()
    const [post, setPost] = useState()

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
                        if(data.post != 'Aucun post pour le moment'){
                            console.log(data)
                        } else {
                            console.log('rien')
                        }
                    })
                }
            })
        }
    }, [])
    
    return (
        <main>
            {!user? <h1>load</h1> : <h1>{user.lastName} {user.name}'s Profil</h1>}
        </main>
     );
}

export default Main;

// Add Footer after Post