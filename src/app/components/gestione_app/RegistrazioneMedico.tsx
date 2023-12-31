import { Box } from '@mui/material';
import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import React, { useState } from 'react';
import MedicoService from 'app/services/gestione_autenticazione/MedicoService';

const RegistrazioneMedico: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    indirizzo_studio: '',
    citta: '',
    numero_civico: '',
    numero_telefono_studio: '',
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
    const medico: Medico = {
      nome: formData.nome,
      cognome: formData.cognome,
      indirizzo_studio: formData.indirizzo_studio,
      citta: formData.citta,
      numero_civico: formData.numero_civico,
      numero_telefono_studio: formData.numero_telefono_studio,
      email: formData.email,
      passwd: formData.passwd,
    };

    const medicoService: MedicoService = new MedicoService();
    medicoService
      .inviaDatiMedico(medico)
      .then(() => {
        console.log('Dati inviati correttamente' + medico);

        setFormData({
          nome: '',
          cognome: '',
          indirizzo_studio: '',
          citta: '',
          numero_civico: '',
          numero_telefono_studio: '',
          email: '',
          passwd: '',
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
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
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="indirizzo_studio"
          id="outlined-indirizzo-input"
          placeholder="Indirizzo Studio"
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="citta"
          id="outlined-citta-input"
          placeholder="Città"
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="numero_civico"
          id="outlined-num-civico-input"
          placeholder="Numero Civico"
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="numero_telefono_studio"
          id="outlined-num-telefono-input"
          placeholder="Numero Telefono (Studio)"
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          id="outlined-email-input"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="passwd"
          id="outlined-password-input"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Registrati" />
      </form>
    </>
  );
};

export default RegistrazioneMedico;
