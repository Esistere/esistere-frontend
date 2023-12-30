import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const LoginElement: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>{
    const{name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const utente : UtenteRegistrato = {
      email : formData.email,
      password : formData.password,
    }
  }*/

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="standard-required"
          label="Email"
          variant="standard"
        />
        <TextField
          required
          id="standard-required"
          label="Password"
          variant="standard"
        />
      </div>
    </Box>
  );
};

export default LoginElement;
