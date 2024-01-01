import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'app/css/index.css';
import App from './app/components/App';
import reportWebVitals from './app/reportWebVitals';
import Login from './app/components/gestione_app/Login';
import Registrazione from './app/components/gestione_app/Registrazione';
import { HOME } from './app/config';
import ListaPazienti from './app/components/gestione_app/ListaPazienti';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={HOME} element={<App />} />
        <Route path={`${HOME}/login`} element={<Login />} />
        <Route path={`${HOME}/registrazione`} element={<Registrazione />} />
        <Route path={`${HOME}/lista`} element={<ListaPazienti />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
