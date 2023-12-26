import React from 'react';
import ReactDOM from 'react-dom/client';
import 'app/css/index.css';
import App from './app/components/gestione_app/App';
import reportWebVitals from './app/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
