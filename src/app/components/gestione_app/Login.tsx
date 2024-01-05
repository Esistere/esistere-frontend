import { HOME } from 'app/config';
import LoginControl from 'app/control/gestione_autenticazione/LoginControl';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { UserType } from './UserProvider';

const Login: React.FC = () => {
  const navigate = useNavigate();
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
      .then((value) => {
        switch (value) {
          case UserType.medico:
            // TODO Routing dedicato al medico
            console.log('medico');
            navigate(`/${HOME}`);
            window.location.reload();
            break;
          case UserType.caregiver:
            // TODO Routing dedico al caregiver
            console.log('caregiver');
            navigate(`/${HOME}`);
            window.location.reload();
            break;
        }
      })
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
