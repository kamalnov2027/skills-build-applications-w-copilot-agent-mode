import React, { useEffect, useState } from 'react';


function getApiUrl() {
  const envName = process.env.REACT_APP_CODESPACE_NAME;
  if (envName) {
    return `https://${envName}-8000.app.github.dev/api/workouts/`;
  }
  const { protocol, hostname, port } = window.location;
  let base = `${protocol}//${hostname}`;
  if (port) base += `:${port}`;
  return `${base}/api/workouts/`;
}


function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const apiUrl = getApiUrl();

  useEffect(() => {
    console.log('Workouts API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched workouts:', results);
        setWorkouts(results);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{idx + 1}</td>
                <td>{workout.name}</td>
                <td>{workout.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
