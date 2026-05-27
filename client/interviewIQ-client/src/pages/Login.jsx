import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {

  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" })

  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target


    const newCrdentials = { ...userCredentials }
    newCrdentials[name] = value

    setUserCredentials(newCrdentials)
  }

  async function login(e) {
    e.preventDefault()

    try {

      const data = await axios.post(`http://localhost:4000/auth/login`, userCredentials)

      console.log(data)

      localStorage.setItem('token',data.data.token)
      localStorage.setItem('user',JSON.stringify(data.data.userDetails))
      navigate("/")


    } catch (err) {
      console.log(err, err.response)
      toast.error(err?.response?.data?.message)
    }

  }



  return (
    <div>
      <form onSubmit={login}>

        <div>
          <label htmlFor="email"> Email </label>
          <input type="email" onChange={handleChange} required name='email' id='email' value={userCredentials.email} />
        </div>

        <div>
          <label htmlFor="password"> Password </label>
          <input type="password" onChange={handleChange} required name='password' id="password" value={userCredentials.password} />
        </div>

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default Login