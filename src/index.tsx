import 'app/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './app/components/App';
import Login from './app/components/gestione_autenticazione/Login';
import Registrazione from './app/components/gestione_autenticazione/Registrazione';
import { UserProvider } from './app/components/gestione_autenticazione/UserProvider';
import AreaPersonaleCaregiver from './app/components/gestione_autenticazione/caregiver/AreaPersonaleCaregiver';
import HomeCaregiver from './app/components/gestione_autenticazione/caregiver/HomeCaregiver';
import AreaPersonaleMedico from './app/components/gestione_autenticazione/medico/AreaPersonaleMedico';
import HomeMedico from './app/components/gestione_autenticazione/medico/HomeMedico';
import ListaPazienti from './app/components/gestione_autenticazione/medico/ListaPazienti';
import CreaFilastrocca from './app/components/gestione_filastrocca/CreaFilastrocca';
import ListaFilastrocche from './app/components/gestione_filastrocca/ListaFilastrocche';
import CreaQuizAllenamento from './app/components/gestione_quiz_allenamento/CreaQuizAllenamento';
import CreaStoria from './app/components/gestione_storia/CreaStoria';
import CreaToDoList from './app/components/gestione_todolist/CreaToDoList';
import reportWebVitals from './app/reportWebVitals';

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
          <Route
            path="/medico/area_personale"
            element={<AreaPersonaleMedico />}
          />
          <Route path="/medico/lista" element={<ListaPazienti />} />
          <Route path="/caregiver" element={<HomeCaregiver />} />
          <Route
            path="/caregiver/area_personale"
            element={<AreaPersonaleCaregiver />}
          />
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
