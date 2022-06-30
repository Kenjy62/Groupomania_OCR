import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/global/icon-left-font-monochrome-white.png'

function Header(){




    return (
      <>
      <div className='test'></div>
      <header>
        <div className='logo'>
          <Link to='/dashboard'><img src={Logo}></img></Link>
        </div>
        <nav>
          <ul>
            <li className='active'><i class="fa-solid fa-house"></i> Home</li>
            <li><i class="fa-solid fa-bell"></i> Notifications</li>
            <li><i class="fa-solid fa-user"></i> Me</li>
            <li><i class="fa-solid fa-arrow-right-from-bracket"></i> Exit</li>
          </ul>
        </nav>
        <div style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }} className='button animated'>New Post</div>
      </header></>
    )
}

export default Header

/* <div className='user'>
          <Link to='/me'><img src='https://picsum.photos/id/237/200/300'></img></Link>
        </div>
        */