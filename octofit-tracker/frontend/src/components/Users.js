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
      <h2 className="mb-4 display-6">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
