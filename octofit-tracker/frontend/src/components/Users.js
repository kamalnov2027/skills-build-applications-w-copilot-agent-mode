import React, { useEffect, useState } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let apiBase;
    if (process.env.REACT_APP_CODESPACE_NAME) {
      apiBase = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
    } else if (typeof window !== 'undefined' && window.location) {
      apiBase = `${window.location.protocol}//${window.location.hostname}:8000/api`;
    } else {
      apiBase = '/api';
    }

    const endpoint = `${apiBase}/users/`;
    console.log('[Users] endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('[Users] fetched data:', data);
        const list = Array.isArray(data) ? data : (data && data.results) ? data.results : [];
        setItems(list);
      })
      .catch((err) => console.error('[Users] fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <p>Showing {items.length} users</p>
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={idx} className="list-group-item">
            <pre style={{margin:0}}>{JSON.stringify(it, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
