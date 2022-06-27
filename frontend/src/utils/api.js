import axios from "axios"

const headers = {
    "Content-Type": "application/json"
  };
  const burl = "http://localhost:3000";

  export default {
    login: function(email, password) {
        return axios.post(
            `${burl}/api/auth/login`,
            {
                email,
                password
            },
            {
                headers: headers
            }
        )
    },
    
    register: function(name, lastName, email, password){
        return axios.post(
            `${burl}/api/auth/register`,
                {
                    name,
                    lastName,
                    email,
                    password
                },
                {
                    headers: headers
                }
        )
    }
  }