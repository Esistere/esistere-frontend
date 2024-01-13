import React, { useEffect, useState } from 'react';
import RegistrazioneCaregiverFamiliare from './RegistrazioneCaregiverFamiliare';
import RegistrazioneMedico from './RegistrazioneMedico';
import Navbar from '../Navbar';
import Pulsante from 'app/components/gestione_app/Pulsante';
import 'app/css/gestione_app/FormElements.css';

const Registrazione: React.FC = () => {
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

  return (
    <>
      <Navbar />
      <div className="allContainer">
        <div className="optionContainer">
          <div
            className="option"
            style={isWideScreen ? { borderRight: '1px solid gray' } : {}}
          >
            <h4 className="testo">Sei un medico?</h4>
            {Pulsante({
              tipologia: 'scuro',
              testo: 'Registrati qui!',
              nome: 'registrazione-medico',
              borderColor: '#000000',
              onClick: (): void => setTipo('medico'),
            })}
          </div>
          <div className="option">
            <h4 className="testo">Ti occupi di uno dei nostri pazienti?</h4>
            {Pulsante({
              tipologia: 'scuro',
              testo: 'Registrati qui!',
              nome: 'registrazione-caregiver-familiare',
              borderColor: '#000000',
              onClick: (): void => setTipo('caregiver-familiare'),
            })}
          </div>
        </div>
        <div className="regicontainer">
          {tipo === 'medico' ? (
            <RegistrazioneMedico />
          ) : tipo === 'caregiver-familiare' ? (
            <RegistrazioneCaregiverFamiliare />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Registrazione;
