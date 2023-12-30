import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const SignUpElement: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    codice_identificativo: '',
    indirizzo: '',
    citta: '',
    num_civico: '',
    data_di_nascita: '',
    num_telefono: '',
    email: '',
    password: '',
  });
  /*
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };  */

  /* const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const utente: Utente = {
      nome: formData.nome,
      cognome: formData.cognome,
      codice_identificativo: formData.codice_identificativo,
      indirizzo: formData.indirizzo,
      citta: formData.citta,
      num_civico: formData.num_civico,
      data_di_nascita: formData.data_di_nascita,
      num_telefono: formData.num_telefono,
      email: formData.email,
      password: formData.password,
    };
  };*/
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField required id="outlined-nome-input" label="Nome" />
      <TextField id="outlined-cognome-input" label="Cognome" type="text" />
      <br />

      <TextField
        id="outlined-codice_identificativo-input"
        label="Codice Identificativo"
        type="text"
      />
      <TextField id="outlined-indirizzo-input" label="indirizzo" type="text" />
      <TextField id="outlined-citta-input" label="citta" type="text" />
      <TextField
        id="outlined-num-civico-input"
        label="numero civico"
        type="number"
      />
      <input required type="date" name="data_di_nascita" />
      <TextField
        id="outlined-num-telefono-input"
        label="numero telefono"
        type="number"
      />
      <TextField id="outlined-email-input" label="email" type="email" />
      <TextField
        id="outlined-password-input"
        label="password"
        type="password"
      />
    </Box>
  );
};

export default SignUpElement;
