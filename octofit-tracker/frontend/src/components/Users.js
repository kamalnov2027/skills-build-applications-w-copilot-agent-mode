import React, { useEffect, useState } from 'react';


function getApiUrl() {
  const envName = process.env.REACT_APP_CODESPACE_NAME;
  if (envName) {
    return `https://${envName}-8000.app.github.dev/api/users/`;
  }
  const { protocol, hostname, port } = window.location;
  let base = `${protocol}//${hostname}`;
  if (port) base += `:${port}`;
  return `${base}/api/users/`;
}


function Users() {
  const [users, setUsers] = useState([]);
  const apiUrl = getApiUrl();

  useEffect(() => {
    console.log('Users API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched users:', results);
        setUsers(results);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user, idx) => (
          <li key={user.id || idx} className="list-group-item">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
