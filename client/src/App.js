import React from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import Issues from './routes/Issues';
import Profile from './routes/Profile';
import Auth from './routes/Auth';
import { UserContext } from './context/UserProvider';

export default function App() {
    let navigate = useNavigate();

    
    const { token, logout, user } = React.useContext(UserContext)
    
    function logoutReturnToAuth() {
      navigate('/')
      logout()
    }

    return (
      <div>
        <h1>Online Debate Network</h1>
        <nav>
        <Link to="/">Home</Link>
        {token && <> |{" "}<Link to="/issues">Issues</Link> |{" "} </>}
        {token && <><Link to="/profile">Profile</Link> |{" "} </>}
        {user.username && 
          <>
            <span>Logged in as {user.username}</span> <button onClick={logoutReturnToAuth}>Log Out</button>
          </>
        }
        
        </nav>
        <Routes>
            <Route 
                path='/'
                element={ token ? <Navigate to="/profile" /> : <Auth /> }
            />
            <Route 
                path='/issues'
                element={<Issues />}
            />
            <Route 
                path='/profile'
                element={<Profile />}
            />
        </Routes>
      </div>
    );
  }