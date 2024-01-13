import 'app/css/gestione_app/FormElements.css';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import LoginControl from 'app/control/gestione_autenticazione/LoginControl';
import { UserType } from './UserProvider';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Pulsante from './Pulsante';
import Button from '@mui/material/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    passwd: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickShowPassword = (): void =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
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
            navigate('/');
            window.location.reload();
            break;
          case UserType.caregiver:
            // TODO Routing dedico al caregiver
            console.log('caregiver');
            navigate('/');
            window.location.reload();
            break;
          default:
            console.error('Tipo di utente non gestito');
        }
      })
      .catch((e) => console.log(e));
  };

  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');
  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  return (
    <>
      <Navbar />
      <form method="post" className="formflex" onSubmit={handleSubmit}>
        <div className="riga">
          <h3 className="testo">
            Effettua l&apos;accesso, oppure{' '}
            <Link to="/registrazione">
              {Pulsante({
                tipologia: 'scuro',
                testo: 'Registrati ora!',
                nome: 'registrazione',
                inizio: null,
                fine: null,
                borderColor: '#ffffff',
              })}
            </Link>
          </h3>
        </div>
        <div className="riga">
          <TextField
            required
            type="email"
            id="current-email"
            name="email"
            label="Email"
            placeholder="Email"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChange}
          />
        </div>
        <div className="riga">
          <TextField
            required
            type={showPassword ? 'text' : 'password'}
            id="current-password"
            name="passwd"
            label="Password"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            placeholder="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="riga">
          <Button
            style={{
              color: '#ffffff',
              backgroundColor: coloreBottone,
              margin: '1em',
              boxSizing: 'border-box',
            }}
            variant="outlined"
            onMouseEnter={() => gestisciHover(true)}
            onMouseLeave={() => gestisciHover(false)}
            type="submit"
          >
            Accedi
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
