
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light border-bottom mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">Octofit Tracker</Link>
          <ul className="navbar-nav flex-row ms-3">
            <li className="nav-item me-3"><Link className="nav-link" to="/activities">Activities</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" to="/teams">Teams</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" to="/users">Users</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/" element={<div className="container mt-4"><h2 className="mt-4">Welcome to Octofit Tracker!</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
