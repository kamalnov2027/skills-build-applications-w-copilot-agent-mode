import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // compute API base at runtime so tests that set env later work correctly
    let apiBase;
    if (process.env.REACT_APP_CODESPACE_NAME) {
      apiBase = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
    } else if (typeof window !== 'undefined' && window.location) {
      apiBase = `${window.location.protocol}//${window.location.hostname}:8000/api`;
    } else {
      apiBase = '/api';
    }

    const endpoint = `${apiBase}/activities/`;
    console.log('[Activities] endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('[Activities] fetched data:', data);
        const list = Array.isArray(data) ? data : (data && data.results) ? data.results : [];
        setItems(list);
      })
      .catch((err) => console.error('[Activities] fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <p>Showing {items.length} items</p>
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
