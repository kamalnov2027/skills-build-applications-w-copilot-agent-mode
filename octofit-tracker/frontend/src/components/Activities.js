import React, { useEffect, useState } from 'react';


export default function Activities() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let apiBase;
    let endpoint;
    if (process.env.REACT_APP_CODESPACE_NAME) {
      endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    } else if (typeof window !== 'undefined' && window.location) {
      endpoint = `${window.location.protocol}//${window.location.hostname}:8000/api/activities/`;
    } else {
      endpoint = '/api/activities/';
    }
    console.log('[Activities] endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data && data.results) ? data.results : [];
        console.log('[Activities] fetched data:', list);
        setItems(list);
      })
      .catch((err) => console.error('[Activities] fetch error:', err));
  }, []);

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
            {items.map((activity, idx) => (
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
