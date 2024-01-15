import React from 'react';
import { UserType, useUser } from '../gestione_autenticazione/UserProvider';
import AccessoNegato from '../gestione_autenticazione/AccessoNegato';
import Navbar from '../Navbar';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import 'app/css/gestione_app/FormElements.css';
import { useNavigate } from 'react-router-dom';
import Pulsante from '../gestione_app/Pulsante';

function QuizAllenamento(): JSX.Element {
  const { userType } = useUser();
  const navigate = useNavigate();

  if (window !== undefined) {
    if (
      location.pathname === '/medico/quiz_allenamento' &&
      userType === UserType.caregiver
    ) {
      navigate('/caregiver/quiz_allenamento');
      window.location.reload();
    } else if (
      location.pathname === '/caregiver/quiz_allenamento' &&
      userType === UserType.medico
    ) {
      navigate('/medico/quiz_allenamento');
      window.location.reload();
    }
  }

  if (userType === UserType.caregiver) {
    return (
      <>
        <Navbar />
        <div
          className="optionContainer"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="option">
            <div className="optionIcon">
              <AddIcon style={{ fontSize: '5rem' }} />
            </div>
            <br />
            <Pulsante
              tipologia="scuro"
              testo="Crea un nuovo Quiz"
              nome="crea-quiz"
              onClick={() => {
                navigate('/caregiver/crea_quiz_allenamento');
                window.location.reload();
              }}
            />
          </div>
          <div className="option">
            <div className="optionIcon">
              <PreviewIcon style={{ fontSize: '5rem' }} />
            </div>
            <Pulsante
              tipologia="scuro"
              testo="Visualizza i quiz"
              nome="registrazione-caregiver-familiare"
              onClick={() => {
                navigate('/caregiver/visualizza_quiz_allenamento');
                window.location.reload();
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <AccessoNegato />
    </div>
  );
}

export default QuizAllenamento;
