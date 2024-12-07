import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'

    function Login({ onLogin }) {
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')
      const navigate = useNavigate()

      const handleSubmit = (e) => {
        e.preventDefault()
        if (username === 'admin' && password === 'password') {
          onLogin()
          navigate('/gallery')
        } else {
          alert('Invalid credentials')
        }
      }

      return (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )
    }

    export default Login
