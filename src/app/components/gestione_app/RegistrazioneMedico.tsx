import { Box } from '@mui/material';
import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import React, { useState } from 'react';
import Navbar from '../Navbar';

const RegistrazioneMedico: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    indirizzo_studio: '',
    citta: '',
    numero_civico: '',
    numero_telefono_studio: '',
    email: '',
    password: '',
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
    const utente: Medico = {
      nome: formData.nome,
      cognome: formData.cognome,
      indirizzo_studio: formData.indirizzo_studio,
      citta: formData.citta,
      numero_civico: formData.numero_civico,
      numero_telefono_studio: formData.numero_telefono_studio,
      email: formData.email,
      passwd: formData.password,
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
            name="indirizzo_studio"
            id="outlined-indirizzo-input"
            placeholder="Indirizzo Studio"
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
            type="text"
            name="numero_telefono_studio"
            id="outlined-num-telefono-input"
            placeholder="Numero Telefono (Studio)"
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

export default RegistrazioneMedico;
