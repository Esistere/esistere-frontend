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
import CreaQuizAllenamento from './app/components/gestione_app/CreaQuizAllenamento';
import CreaStoria from './app/components/gestione_app/CreaStoria';
import CreaFilastrocca from './app/components/gestione_app/CreaFilastrocca';
import CreaToDoList from './app/components/gestione_app/CreaToDoList';
import HomeMedico from './app/components/gestione_app/HomeMedico';
import HomeCaregiver from './app/components/gestione_app/HomeCaregiver';
import { UserProvider } from './app/components/gestione_app/UserProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path={HOME} element={<App />} />
          <Route path={`${HOME}/registrazione`} element={<Registrazione />} />
          <Route path={`${HOME}/login`} element={<Login />} />
          <Route path={`${HOME}/medico`} element={<HomeMedico />} />
          <Route path={`${HOME}/medico/lista`} element={<ListaPazienti />} />
          <Route path={`${HOME}/caregiver`} element={<HomeCaregiver />} />
          <Route
            path={`${HOME}/caregiver/crea_storia`}
            element={<CreaStoria />}
          />
          <Route
            path={`${HOME}/caregiver/crea_quiz_allenamento`}
            element={<CreaQuizAllenamento />}
          />
          <Route
            path={`${HOME}/caregiver/crea_filastrocca`}
            element={<CreaFilastrocca />}
          />
          <Route
            path={`${HOME}/caregiver/crea_todolist`}
            element={<CreaToDoList />}
          />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
