import React, { useEffect, useState } from 'react';


function getApiUrl() {
  const envName = process.env.REACT_APP_CODESPACE_NAME;
  if (envName) {
    return `https://${envName}-8000.app.github.dev/api/activities/`;
  }
  // fallback to current host
  const { protocol, hostname, port } = window.location;
  let base = `${protocol}//${hostname}`;
  if (port) base += `:${port}`;
  return `${base}/api/activities/`;
}


function Activities() {
  const [activities, setActivities] = useState([]);
  const apiUrl = getApiUrl();

  useEffect(() => {
    console.log('Activities API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched activities:', results);
        setActivities(results);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Date</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{idx + 1}</td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.date}</td>
                <td>{activity.user && activity.user.name ? activity.user.name : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
