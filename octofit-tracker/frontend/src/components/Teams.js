import React, { useEffect, useState } from 'react';


function getApiUrl() {
  const envName = process.env.REACT_APP_CODESPACE_NAME;
  if (envName) {
    return `https://${envName}-8000.app.github.dev/api/teams/`;
  }
  const { protocol, hostname, port } = window.location;
  let base = `${protocol}//${hostname}`;
  if (port) base += `:${port}`;
  return `${base}/api/teams/`;
}


function Teams() {
  const [teams, setTeams] = useState([]);
  const apiUrl = getApiUrl();

  useEffect(() => {
    console.log('Teams API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched teams:', results);
        setTeams(results);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team, idx) => (
          <li key={team.id || idx} className="list-group-item">
            {team.name} - {team.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
