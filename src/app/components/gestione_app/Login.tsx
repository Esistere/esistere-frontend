import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from '../Navbar';
import { HOME } from 'app/config';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
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
    // const utente: any = {
    //   email: formData.email,
    //   password: formData.password,
    // };
  };

  return (
    <>
      <Navbar />
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <form method="post" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            id="standard-required"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <br />
          <input
            required
            type="password"
            id="standard-required"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <br />
          <input type="submit" value="Accedi"></input>
          <br />
        </form>
      </Box>
      <label htmlFor="registrazione">Non hai un account? </label>
      <Link to={`/${HOME}/registrazione`}>
        <button name="registrazione">Registrati</button>
      </Link>
    </>
  );
};

export default Login;
