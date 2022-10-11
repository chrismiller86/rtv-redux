import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Issues from './routes/Issues';
import Expenses from './routes/Expenses';
import Auth from './routes/Auth';

export default function App() {
    return (
      <div>
        <h1>Online Debate Network</h1>
        <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/issues">Issues</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        </nav>
        <Routes>
            <Route 
                path='/'
                element={<Auth />}
            />
            <Route 
                path='/issues'
                element={<Issues />}
            />
            <Route 
                path='/expenses'
                element={<Expenses />}
            />
        </Routes>
      </div>
    );
  }