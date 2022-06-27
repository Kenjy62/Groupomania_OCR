import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/global/icon-left-font-monochrome-white.png'

function Header(){
    return (
        <header>
        <div className='logo'>
          <img src={Logo}></img>
        </div>
        <div className='user'>
          <Link to='/me'><img src='https://picsum.photos/id/237/200/300'></img></Link>
        </div>
      </header>
    )
}

export default Header