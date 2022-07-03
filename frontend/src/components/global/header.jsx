import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/global/icon-left-font-monochrome-white.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header(props){
    const [createPost, setCreatePost] = useState(false)
    const [logout, setLogout] = useState()
    let navigate = useNavigate()
    useEffect(() => {
      if(logout == true){
        localStorage.clear()
        navigate('/')
      }
    }, [logout])

    useEffect(() => {
      console.log('sendd')
      if(createPost === true){
        props.openCreatePost()
      }
    }, [createPost])

    return (
      <>
      <div className='test'></div>
      <header>
        <div className='logo'>
          <Link to='/dashboard'><img src={Logo}></img></Link>
        </div>
        <nav>
          <ul>
            <li className={props.option == 'home'? 'active' : null}><i class="fa-solid fa-house"></i> Home</li>
            <li className={props.option == 'notification'? 'active' : null}><i class="fa-solid fa-bell"></i> Notifications</li>
            <li className={props.option == 'profil'? 'active' : null}><i class="fa-solid fa-user"></i> Profil</li>
            <li onClick={() => setLogout(true)}><i class="fa-solid fa-arrow-right-from-bracket"></i> Exit</li>
          </ul>
        </nav>
        <div onClick={() => setCreatePost(true)} style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }} className='button animated'>New Post</div>
      </header></>
    )
}

export default Header

/* <div className='user'>
          <Link to='/me'><img src='https://picsum.photos/id/237/200/300'></img></Link>
        </div>
        */