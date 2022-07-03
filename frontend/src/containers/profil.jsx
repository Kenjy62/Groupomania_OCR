// Import dependances

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Style
import '../styles/dashboard.css'
import '../styles/post.css'

// Components
import Header from '../components/global/header'
import Main from '../components/profil/main'

function App(props) {
    let navigate = useNavigate()
    
    const [user, setUser] = useState()
    const token = localStorage.getItem('token')

    // Fetch UserData
    useEffect(()=> {
      if(!user){
        fetch('http://localhost:3000/api/auth/user/' + token, {
          method: 'GET', 
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          }).then(res => {
            if(res.status === 200){
              const data = res.json()
              data.then(json => {
                let dataParse = json.data
                setUser(dataParse)
              })
            } else {
              navigate('/')
            }
          })
      }
    }, [])


  // Render Page
  return (
    <>
      <Header option={props.option}/>
      <Main data={user}/>
    </>
  )
}
  
export default App;