import React, { useEffect, useState } from 'react';
function getApiUrl() {
  const envName = process.env.REACT_APP_CODESPACE_NAME;
  if (envName) {
    return `https://${envName}-8000.app.github.dev/api/leaderboard/`;
  }
  const { protocol, hostname, port } = window.location;
  let base = `${protocol}//${hostname}`;
  if (port) base += `:${port}`;
  return `${base}/api/leaderboard/`;
}


function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = getApiUrl();

  useEffect(() => {
    console.log('[Leaderboard] endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : (data && data.results) ? data.results : [];
        console.log('[Leaderboard] fetched data:', results);
        setLeaderboard(results);
      })
      .catch(err => {
        console.error('[Leaderboard] fetch error:', err);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={entry.id || idx}>
                <td>{idx + 1}</td>
                <td>{entry.team && entry.team.name ? entry.team.name : 'Team'}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
