import React from 'react';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import { Box } from '@mui/material';
import Navbar from '../Navbar';
import { useState } from 'react';

const RegistrazioneCaregiverFamiliare: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    indirizzo: '',
    citta: '',
    numero_civico: '',
    data_di_nascita: '',
    numero_telefono: '',
    email: '',
    passwd: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const caregiverFamiliare: CaregiverFamiliare = {
      nome: formData.nome,
      cognome: formData.cognome,
      indirizzo: formData.indirizzo,
      citta: formData.citta,
      numero_civico: formData.numero_civico,
      data_di_nascita: formData.data_di_nascita,
      numero_telefono: formData.numero_telefono,
      email: formData.email,
      passwd: formData.passwd,
    };
  };

  return (
    <>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <form method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            id="outlined-nome-input"
            required
            placeholder="Nome"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="cognome"
            id="outlined-cognome-input"
            placeholder="Cognome"
            required
          />
          <br />
          <input
            type="text"
            name="indirizzo"
            id="outlined-indirizzo-input"
            placeholder="Indirizzo"
            required
          />
          <br />
          <input
            type="text"
            name="citta"
            id="outlined-citta-input"
            placeholder="Città"
            required
          />
          <br />
          <input
            type="text"
            name="numero_civico"
            id="outlined-num-civico-input"
            placeholder="Numero Civico"
            required
          />
          <br />
          <input 
            type="date" 
            name="data_di_nascita" 
            id="" 
            required />
          <br />
          <input
            type="text"
            name="numero_telefono"
            id="outlined-num-telefono-input"
            placeholder="Numero Telefono"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            id="outlined-email-input"
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            id="outlined-password-input"
            placeholder="Password"
            required
          />
        </form>
      </Box>
    </>
  );
};

export default RegistrazioneCaregiverFamiliare;
