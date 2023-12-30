import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'app/css/index.css';
import App from './app/components/App';
import reportWebVitals from './app/reportWebVitals';
import FormPaziente from './app/components/gestione_app/FormPaziente';
import Login from './app/components/gestione_app/LoginForm';
import Registrazione from './app/components/gestione_app/Registrazione';
import { HOME } from './app/config';

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
        <Route path={`${HOME}/formPaziente`} element={<FormPaziente />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
