import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Issues from './routes/Issues';
import Profile from './routes/Profile';
import Auth from './routes/Auth';
import ProtectedRoute from './routes/ProtectedRoute'
import { UserContext } from './context/UserProvider';
import Navbar from './components/Navbar';
import './style.css'

export default function App() {

    const { token, logout, user } = React.useContext(UserContext)

    return (
      <div>
        {token && <Navbar user={user} logout={logout} />}
        <h1>Online Debate Network</h1>
        <Routes>
          <Route 
            path='/'
            element={ token ? <Navigate to="/profile" /> : <Auth /> }
          />
          <Route 
            path='/issues'
            element={<ProtectedRoute token={token} redirectTo="/" >
              <Issues />
            </ProtectedRoute>  }
          />
          <Route 
            path='/profile'
            element={<ProtectedRoute token={token} redirectTo='/' >
              <Profile />
            </ProtectedRoute>}
          />
        </Routes>
      </div>
    );
  }