import React from 'react';
import { useState, useEffect } from 'react';
import Posts from '../dashboard/Post/posts';
import PostList from '../dashboard/Post/items';
import Topbar from '../global/topbar';
import Left from './left';

function Main(props) {

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
                            setIsLoading(true)
                        }
                    })
                }
            })
        }
    }, [])
    
    return (
        <main>
            <Topbar user={props.data}/>
            <div id="wrapper">
                <div id="main--container">
                    <div className="left">
                        <div className="blocks">
                            <div className="blocks--user--infos">
                                <img src={user? user.avatar : null}/>
                                <span>{user? user.name + ' ' + user.lastName : null}</span>
                                <span>{!user? null : user.admin === true? 'Vous êtes admin': null}</span>
                                <span style={{color: 'grey'}}>@andersonN</span>
                                <span>Lille, France</span>
                            </div>
                            <div className="blocks--user--stats">
                                <span style={{color: 'grey'}}>Posts <br/> <font style={{color: 'white'}}>147</font></span>
                                <span style={{color: 'grey'}}>Abonnés <br/> <font style={{color: 'white'}}>5</font></span>
                                <span style={{color: 'grey'}}>Abonnement <br/> <font style={{color: 'white'}}>15</font></span>
                            </div>
                        </div>
                        
                        {user && props.data?
                        <div className='blocks'>
                            {props.data.name === user.name || props.data.admin === true?  <button style={{width: '100%', marginBottom: 15}}>Modifier le profil</button> : null}
                            {props.data.admin === true? <><button style={{width: '100%', marginBottom: 15}}>Supprimer l'utilisateur</button><button style={{width: '100%', marginBottom: 15}}>Promouvoir Admin</button></> : null}
                        </div> : null
                        }
                       
                    </div>
            <div className="center">
                <div className="blocks">
                    <Posts option={'profil'} data={props.data} post={post} editFunc={props.editFunc} updateFunc={props.updateFunc} cancelFunc={props.cancelFunc}/>
                </div>
            </div>
            <div className="right">
                <div className="blocks"></div>
            </div>
                </div>
            </div>
        </main>
     );
}

export default Main;

// Add Footer after Post