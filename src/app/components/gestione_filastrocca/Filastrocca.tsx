import React from 'react';
import { UserType, useUser } from '../gestione_autenticazione/UserProvider';
import AccessoNegato from '../gestione_autenticazione/AccessoNegato';
import Navbar from '../Navbar';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import 'app/css/gestione_app/FormElements.css';
import { useNavigate } from 'react-router-dom';
import Pulsante from '../gestione_app/Pulsante';

function Filastrocca(): JSX.Element {
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
        <div className="optionContainer">
          <div className="option">
            <div className="optionIcon" id="home-quiz">
              <AddIcon style={{ fontSize: '5rem' }} />
            </div>

            <Pulsante
              tipologia="scuro"
              testo="Crea un nuovo Quiz"
              nome="crea-quiz"
              className="optionText"
              onClick={() => {
                navigate('/caregiver/crea_filastrocca');
                window.location.reload();
              }}
            />
          </div>

          <div className="option ">
            <div className="optionIcon">
              <PreviewIcon style={{ fontSize: '5rem' }} />
            </div>
            <Pulsante
              tipologia="scuro"
              testo="Visualizza le filastrocche"
              nome="visualizza-filastrocche"
              className="optionText"
              onClick={() => {
                navigate('/caregiver/visualizza_filastrocche');
                window.location.reload();
              }}
            />
          </div>
        </div>
      </>
    );
  }

  if (userType === UserType.medico) {
    return (
      <>
        <Navbar />
        <div className="optionContainer">
          <div className="option">
            <div className="optionIcon">
              <PreviewIcon style={{ fontSize: '5rem' }} />
            </div>
            <Pulsante
              tipologia="scuro"
              testo="Visualizza i quiz"
              nome="visualizza-quiz"
              className="optionText"
              onClick={() => {
                navigate('/medico/visualizza_quiz_allenamento');
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

export default Filastrocca;
