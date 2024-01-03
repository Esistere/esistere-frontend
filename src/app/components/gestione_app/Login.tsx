import { HOME } from 'app/config';
import LoginControl from 'app/control/gestione_autenticazione/LoginControl';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
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

    const utente = {
      email: formData.email,
      passwd: formData.passwd,
    };

    const loginControl = new LoginControl();
    loginControl
      .login(utente.email, utente.passwd)
      // TODO routing dedicato
      // .then((value) => {
      //   switch (value.userType) {
      //     case UserType.caregiver:
      //       // TODO Routing dedicato al caregiver
      //       break;
      //     case UserType.medico:
      //       // TODO Routing dedico al medico
      //       break;
      //   }
      // })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Navbar />
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
          name="passwd"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Accedi"></input>
        <br />
      </form>
      <label htmlFor="registrazione">Non hai un account? </label>
      <Link to={`/${HOME}/registrazione`}>
        <button name="registrazione">Registrati</button>
      </Link>
    </>
  );
};

export default Login;
