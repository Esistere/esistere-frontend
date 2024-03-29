import React, { useEffect, useState } from 'react';
import RegistrazioneCaregiverFamiliare from './caregiver/RegistrazioneCaregiverFamiliare';
import RegistrazioneMedico from './medico/RegistrazioneMedico';
import Pulsante from 'app/components/gestione_app/Pulsante';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import logo from 'app/assets/logo512.png';
import 'app/css/gestione_app/FormElements.css';
import Caricamento from '../gestione_app/Caricamento';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider';
import Navbar from '../Navbar';

const Registrazione: React.FC = () => {
  const navigate = useNavigate();
  const { userType, loading } = useUser();
  const [tipo, setTipo] = useState<string>('');

  const [isWideScreen, setIsWideScreen] = useState(
    window.innerWidth >
      30 * parseFloat(getComputedStyle(document.documentElement).fontSize)
  );

  useEffect(() => {
    const handleResize = (): void => {
      setIsWideScreen(
        window.innerWidth >
          30 * parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // If the user is already logged in, redirect to the home page
  useEffect(() => {
    if (!loading) {
      if (userType !== null) {
        navigate('/');
      }
    }
  }, [userType, loading, navigate]);

  if (loading) {
    return <Caricamento />;
  }

  return (
    <>
      <Navbar />
      <div className="allContainer">
        <img
          src={logo}
          alt="Logo"
          style={{ height: '100px', marginTop: '20px' }}
        />
        <div className="introduction">
          <h2 className="testo">Benvenuti nella Pagina di Registrazione</h2>
          <div
            className="optionContainer"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              className="option"
              style={isWideScreen ? { borderRight: '1px #ede7f6' } : {}}
            >
              <div className="optionIcon">
                <LocalHospitalIcon style={{ fontSize: '5rem' }} />
              </div>
              <h3 className="testo">Sei un medico?</h3>
              <br />
              <Pulsante
                tipologia="scuro"
                testo="Registrati qui"
                nome="registrazione-medico"
                onClick={() => {
                  setTipo('medico');
                  setTimeout(() => {
                    const element = document.getElementById('med-sect');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 0);
                }}
              />
            </div>
            <div
              className="option"
              style={isWideScreen ? { borderRight: '1px #ede7f6' } : {}}
            >
              <div className="optionIcon">
                <SupervisorAccountIcon style={{ fontSize: '5rem' }} />
              </div>
              <h3 className="testo">Ti occupi di uno dei nostri pazienti?</h3>
              <Pulsante
                tipologia="scuro"
                testo="Registrati qui"
                nome="registrazione-caregiver-familiare"
                onClick={() => {
                  setTipo('caregiver-familiare');
                  setTimeout(() => {
                    const element = document.getElementById('cg-sect');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 0);
                }}
              />
            </div>
          </div>
          <div className="regicontainer">
            {tipo === 'medico' && (
              <>
                <div id="med-sect" style={{ display: 'hidden' }}></div>
                <RegistrazioneMedico />
              </>
            )}
            {tipo === 'caregiver-familiare' && (
              <>
                <div id="cg-sect" style={{ display: 'hidden' }}></div>
                <RegistrazioneCaregiverFamiliare />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Registrazione;
