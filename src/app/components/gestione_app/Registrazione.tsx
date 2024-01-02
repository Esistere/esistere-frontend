import React from 'react';
import RegistrazioneCaregiverFamiliare from './RegistrazioneCaregiverFamiliare';
import RegistrazioneMedico from './RegistrazioneMedico';
import Navbar from '../Navbar';
import 'app/css/gestione_app/FormElements.css';
const Registrazione: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <div className="regicontainer">
          <h4 style={{ color: 'blueviolet', textAlign: 'center' }}>
            Sei un medico?
          </h4>
          <h2 style={{ color: 'blueviolet', textAlign: 'center' }}>
            Registrati qui!
          </h2>
          <RegistrazioneMedico />
        </div>
        <div className="regicontainer">
          <h4 style={{ color: 'blueviolet', textAlign: 'center' }}>
            Ti occupi di uno dei nostri pazienti?
          </h4>
          <h2 style={{ color: 'blueviolet', textAlign: 'center' }}>
            Registrati qui!
          </h2>
          <RegistrazioneCaregiverFamiliare />
        </div>
      </div>
    </>
  );
};

export default Registrazione;
