// Import dependances

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Style
import '../styles/dashboard.css'
import '../styles/post.css'

// Components
import Header from '../components/global/header'
import Main from '../components/profil/main'

function App() {
    let navigate = useNavigate()
     // Fetch UserData
    useEffect(()=> {
        if(localStorage.getItem('token')){

        } else {
            navigate('/')
        }
    }, [])

  // Render Page
  return (
    <>
      <Header />
      <Main/>
    </>
  )
}
  
export default App;