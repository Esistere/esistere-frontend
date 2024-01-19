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
import QuizAllenamento from './app/components/gestione_quiz_allenamento/QuizAllenamento';
import CreaQuizAllenamento from './app/components/gestione_quiz_allenamento/CreaQuizAllenamento';
import ListaQuizAllenamento from './app/components/gestione_quiz_allenamento/ListaQuizAllenamento';
import CreaStoria from './app/components/gestione_storia/CreaStoria';
import CreaToDoList from './app/components/gestione_todolist/CreaToDoList';
import ListaToDoList from './app/components/gestione_todolist/ListaToDoList';
import reportWebVitals from './app/reportWebVitals';
import withCaregiver from './app/components/gestione_autenticazione/caregiver/CaregiverHOC';
import withMedico from './app/components/gestione_autenticazione/medico/MedicoHOC';
import LineeGuidaForm from './app/components/gestione_linee_guida/LineeGuidaForm';
import ListaQuiPreliminare from './app/components/gestione_quiz_preliminare/ListaQuizPreliminare';
import CompilazioneQuizPreliminare from './app/components/gestione_quiz_preliminare/CompilazioneQuizPreliminare';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <HashRouter>
        <Routes>
          {/* Global paths */}
          <Route path="/" element={<App />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/login" element={<Login />} />

          {/* Medico paths */}
          <Route
            path="/medico"
            element={React.createElement(withMedico(HomeMedico))}
          />
          <Route
            path="/medico/area_personale"
            element={React.createElement(withMedico(AreaPersonaleMedico))}
          />
          <Route
            path="/medico/lista"
            element={React.createElement(withMedico(ListaPazienti))}
          />
          <Route
            path="/medico/visualizza_quiz_allenamento"
            element={React.createElement(withMedico(ListaQuizAllenamento))}
          />
          <Route
            path="/medico/visualizza_todolist"
            element={React.createElement(withMedico(ListaToDoList))}
          />
          <Route
            path="/medico/crea_todo_list"
            element={React.createElement(withMedico(CreaToDoList))}
          />
          <Route
            path="/medico/quiz_preliminare"
            element={React.createElement(withMedico(ListaQuiPreliminare))}
          />
          <Route
            path="/medico/visualizza_quiz_allenamento"
            element={React.createElement(withMedico(ListaQuizAllenamento))}
          />
          <Route
            path="/medico/lineeguidaform"
            element={React.createElement(withMedico(LineeGuidaForm))}
          />

          {/* Caregiver paths */}
          <Route
            path="/caregiver"
            element={React.createElement(withCaregiver(HomeCaregiver))}
          />
          <Route
            path="/caregiver/area_personale"
            element={React.createElement(withCaregiver(AreaPersonaleCaregiver))}
          />
          <Route
            path="/caregiver/crea_storia"
            element={React.createElement(withCaregiver(CreaStoria))}
          />
          <Route
            path="/caregiver/quiz_allenamento"
            element={React.createElement(withCaregiver(QuizAllenamento))}
          />
          <Route
            path="/caregiver/crea_quiz_allenamento"
            element={React.createElement(withCaregiver(CreaQuizAllenamento))}
          />
          <Route
            path="/caregiver/visualizza_quiz_allenamento"
            element={React.createElement(withCaregiver(ListaQuizAllenamento))}
          />
          {/* <Route
            path="/caregiver/compila_quiz_allenamento"
            element={React.createElement(withCaregiver(CompilaQuizAllenamento))}
          /> */}
          <Route
            path="/caregiver/crea_filastrocca"
            element={React.createElement(withCaregiver(CreaFilastrocca))}
          />
          <Route
            path="/caregiver/visualizza_filastrocche"
            element={React.createElement(withCaregiver(ListaFilastrocche))}
          />
          {/*
          <Route
            path="/caregiver/crea_todo_list"
            element={React.createElement(withCaregiver(CreaToDoList))}
        />*/}
          <Route
            path="/caregiver/visualizza_todolist"
            element={React.createElement(withCaregiver(ListaToDoList))}
          />
          <Route
            path="/caregiver/compila_quiz_preliminare"
            element={React.createElement(
              withCaregiver(CompilazioneQuizPreliminare)
            )}
          />
        </Routes>
      </HashRouter>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
