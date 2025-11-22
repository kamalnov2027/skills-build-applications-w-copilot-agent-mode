import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
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

    const endpoint = `${apiBase}/leaderboard/`;
    console.log('[Leaderboard] endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('[Leaderboard] fetched data:', data);
        const list = Array.isArray(data) ? data : (data && data.results) ? data.results : [];
        setItems(list);
      })
      .catch((err) => console.error('[Leaderboard] fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <p>Showing {items.length} entries</p>
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
