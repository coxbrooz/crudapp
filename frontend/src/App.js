import React, { useState, useEffect } from 'react';
import Student from './Student';
import Login from './login';

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) setToken(t)
  }, [])

  const handleLogin = (newToken) => {
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    // optional: reload to reset state
    // window.location.reload()
  }

  return (
    <div className="App">
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <div className='d-flex justify-content-end p-2'>
            <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
          </div>
          <Student />
        </div>
      )}
    </div>
  );
}

export default App;