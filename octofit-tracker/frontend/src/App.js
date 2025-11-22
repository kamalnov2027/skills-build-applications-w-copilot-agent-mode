
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Teams from './components/Teams';
import Users from './components/Users';
import Leaderboard from './components/Leaderboard';

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg site-nav bg-light border-bottom mb-4">
        <div className="container nav-container">
          <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img src="/octofitapp-small.svg" alt="OctoFit" className="logo me-2" style={{height:32}} />
            <span className="brand-text">OctoFit Tracker</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-row ms-3">
              <li className="nav-item me-3"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item me-3"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item me-3"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item me-3"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<div><h1 className="display-4 text-primary">Welcome to OctoFit Tracker!</h1><p className="lead">React + Bootstrap are set up.</p></div>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </Router>
  );
}
