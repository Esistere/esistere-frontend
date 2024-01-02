import React from 'react';
import RegistrazioneCaregiverFamiliare from './RegistrazioneCaregiverFamiliare';
import RegistrazioneMedico from './RegistrazioneMedico';
import Navbar from '../Navbar';

const Registrazione: React.FC = () => {
  return (
    <>
      <Navbar />
      <h2>Medico</h2>
      <RegistrazioneMedico />
      <h2>Caregiver/Familiare</h2>
      <RegistrazioneCaregiverFamiliare />
    </>
  );
};

export default Registrazione;