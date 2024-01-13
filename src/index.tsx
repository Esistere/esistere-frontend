import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import 'app/css/index.css';
import App from './app/components/App';
import reportWebVitals from './app/reportWebVitals';
import Login from './app/components/gestione_app/Login';
import Registrazione from './app/components/gestione_app/Registrazione';
import ListaPazienti from './app/components/gestione_app/ListaPazienti';
import CreaQuizAllenamento from './app/components/gestione_app/CreaQuizAllenamento';
import CreaStoria from './app/components/gestione_app/CreaStoria';
import CreaFilastrocca from './app/components/gestione_app/CreaFilastrocca';
import CreaToDoList from './app/components/gestione_app/CreaToDoList';
import HomeMedico from './app/components/gestione_app/HomeMedico';
import HomeCaregiver from './app/components/gestione_app/HomeCaregiver';
import { UserProvider } from './app/components/gestione_app/UserProvider';
import ListaFilastrocche from './app/components/gestione_app/ListaFilastrocche';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/login" element={<Login />} />
          <Route path="/medico" element={<HomeMedico />} />
          <Route path="/medico/lista" element={<ListaPazienti />} />
          <Route path="/caregiver" element={<HomeCaregiver />} />
          <Route path="/caregiver/crea_storia" element={<CreaStoria />} />
          <Route
            path="/caregiver/crea_quiz_allenamento"
            element={<CreaQuizAllenamento />}
          />
          <Route
            path="/caregiver/crea_filastrocca"
            element={<CreaFilastrocca />}
          />
          <Route
            path="/caregiver/visualizza_filastrocche"
            element={<ListaFilastrocche />}
          />

          <Route path="/caregiver/crea_todo_list" element={<CreaToDoList />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
