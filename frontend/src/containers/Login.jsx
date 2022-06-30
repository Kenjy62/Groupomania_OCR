import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

import '../styles/login.css'
import Logo from '../assets/global/icon-left-font-monochrome-white.png'

function Login() {
  let navigate = useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  

  const handleSubmit = async e => {
    let data = {
      email: email,
      password: password
    }
    e.preventDefault();
    
    const userLogin = fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    userLogin.then(response => {
      return response.json()
    }).then(data => {
      if(data.userId){
        localStorage.setItem('token', data.token)
        navigate('/dashboard', {
          state: {data}
        })
      } else {
        setError('La combinaison Email/Mot de passe est incorrect.')
      }
    })
  }

  

  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
        <div id="logo">
          <img src={Logo}></img>
        </div>
      
        <div class="error" style={{display : error? 'block' : 'none'}}>{error}</div>
      
        <form id="login" onSubmit={handleSubmit}>
          <label for="email">Votre Email d'entreprise</label>
          <input type="text" placeholder='@groupomania.com' name="email" onChange={e => setEmail(e.target.value)}></input>
          <label for="password">Votre mot de passe</label>
          <input type="Password" placeholder="*****" name="password" onChange={e => setPassword(e.target.value)}></input>
          <Link to ="/register" style={{textAlign: 'right', marginBottom: 10}}>S'inscrire</Link>
          <button type="submit">Se Connecter</button>
        </form>
      </div>
    </div>
    )
}

export default Login;
