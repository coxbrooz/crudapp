import React, { useState } from 'react'
import axios from 'axios'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8081/login', { email, password })
      if (res.data && res.data.success) {
        // store token and user info
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user || {}))
        if (typeof onLogin === 'function') onLogin(res.data.token)
        else window.location.reload()
      } else {
        setError('Login failed')
      }
    } catch (err) {
      console.error('Login error', err.response || err)
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-primary'>
         <div className='bg-white p-5 rounded w-25'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className='form-control'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                </div>

                 <div className='mb-3'>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className='form-control'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                </div>

                <button type="submit" className='btn btn-success' disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>

                {error && <div className='mt-3 text-danger'>{error}</div>}

                <p className='mt-3'>You agree to our terms and conditions</p>
                <button type="button" className='btn btn-default border'>Create Account</button>
            </form>
         </div>
      
    </div>
  )
}

export default Login
