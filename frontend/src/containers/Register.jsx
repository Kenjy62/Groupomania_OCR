import React, {useState} from 'react'
import { Link } from 'react-router-dom'

/* Res */
import Logo from '../assets/global/icon-left-font-monochrome-white.png'

/* Hooks */
import Regex from '../utils/regex'

function Register() {

  // State
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  // When form is submit
  const handleSubmit = async e => {

    // Reset Error/Success MessageBox
    setError(null)
    setSuccess(null)

    e.preventDefault();

    // Verification
    if(name && lastName && email && password){
      if(email.match(Regex.Email)){
        if(lastName.match(Regex.lastName)){
          if(name.match(Regex.firstName)){
            let data = {
              name: name,
              lastName: lastName,
              email: email,
              password: password
            }
        
            // Register
            const userRegister = fetch('http://localhost:3000/api/auth/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
        
            userRegister.then(response => {
              if(response.status === 201){
                setSuccess('Vous pouvez maintenant vous connectez.')
              }
            }).then(data => {
              // Other
            })
          } else {
            setError('Veuillez entrer un prénom valide.')
          }
        } else {
          setError('Veuillez entrer un nom de famille valide.')
        }
      } else {
        setError(`L'adresse Email n'est pas valide.`)
      }
    } else {
      setError('Veuillez remplir tout le formulaire.')
    }
    
  }

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div id="logo">
          <img src={Logo}></img>
        </div>
      <Link to="/"><div class="success" style={{display: success? 'block' : 'none'}}>{success}</div></Link>
      <div class="error" style={{display: error? 'block' : 'none'}}>{error}</div>
      
      <form id="register" onSubmit={handleSubmit}>
        <label for="name">Prénom :</label>
        <input type="text" placeholder='Doe' name="name" onChange={e => setName(e.target.value)}></input>
        <label for="lastName">Nom de Famille :</label>
        <input type="text" placeholder='John' name="lastName" onChange={e => setLastName(e.target.value)}></input>
        <label for="email">Email d'entreprise :</label>
        <input type="text" placeholder='@groupomania.com' name="email" onChange={e => setEmail(e.target.value)}></input>
        <label for="password">Mot de passe : </label>
        <input type="password" placeholder='****' name="password" onChange={e => setPassword(e.target.value)}></input>
        <Link to ="/" style={{textAlign: 'right', marginBottom: 10}}>Se connecter</Link>
        <button type="submit">S'inscrire</button>
      </form>

      </div>
    </div>
    )
}

export default Register;
