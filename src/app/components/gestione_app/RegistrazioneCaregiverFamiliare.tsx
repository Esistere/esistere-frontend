import React from 'react';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import { useState } from 'react';
import CaregiverFamiliareService from 'app/services/gestione_autenticazione/CaregiverFamiliareService';

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

    const caregiverFamiliareService: CaregiverFamiliareService =
      new CaregiverFamiliareService();
    caregiverFamiliareService
      .inviaDatiCaregiverFamiliare(caregiverFamiliare)
      .then(() => {
        console.log('Dati inviati correttamente' + caregiverFamiliare);
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
          name="indirizzo"
          id="outlined-indirizzo-input"
          placeholder="Indirizzo"
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
          type="date"
          name="data_di_nascita"
          id=""
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="numero_telefono"
          id="outlined-num-telefono-input"
          placeholder="Numero Telefono"
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
          name="password"
          id="outlined-password-input"
          placeholder="Password"
          required
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default RegistrazioneCaregiverFamiliare;
