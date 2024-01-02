import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import React, { useState } from 'react';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import { TextField, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import InputAdornment from '@mui/material/InputAdornment';
import 'app/css/gestione_app/FormElements.css';

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
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const handleMail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/;
    setIsEmailValid(emailRegex.test(value));
  };
  const [isPassValid, setIsPassValid] = useState<boolean>(true);
  const handlePass = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    setIsPassValid(passRegex.test(value));
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

    const medicoControl: MedicoControl = new MedicoControl();
    medicoControl
      .inviaDatiMedico(medico)
      .then(() => {
        console.log('Dati inviati correttamente' + medico);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };
  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  return (
    <>
      <form method="post" className="formflex" onSubmit={handleSubmit}>
        <div className="riga">
          <TextField
            type="text"
            name="nome"
            id="outlined-nome-input"
            required
            label="Nome"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="cognome"
            id="outlined-cognome-input"
            required
            label="Cognome"
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
            type="text"
            name="indirizzo_studio"
            id="outlined-indirizzo-input"
            required
            label="Indirizzo Studio"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="numero_civico"
            id="outlined-num-civico-input"
            required
            label="Numero Civico"
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
            type="text"
            name="citta"
            id="outlined-citta-input"
            required
            label="Città"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="numero_telefono_studio"
            id="outlined-num-telefono-input"
            required
            label="Telefono Studio"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <TextField
            type="email"
            name="email"
            id="outlined-email-input"
            required
            label="Email"
            style={{
              flexBasis: 'calc(26 em)',
              margin: '1em',
              boxSizing: 'border-box',
              marginLeft: '20%',
              marginRight: '20%',
              backgroundColor: isEmailValid ? 'white' : 'lightcoral',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" disabled>
                    <Visibility style={{ opacity: '0' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleMail}
          />
        </div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <TextField
            type={showPassword ? 'text' : 'password'}
            name="passwd"
            id="outlined-passwd-input"
            required
            label="Password"
            style={{
              flexBasis: '26em',
              margin: '1em',
              boxSizing: 'border-box',
              backgroundColor: isPassValid ? 'white' : 'lightcoral',
            }}
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
            onChange={handlePass}
          />
        </div>
        <div style={{ width: '100%' }}>
          <Button
            style={{
              background: coloreBottone,
              marginLeft: '55%',
              marginRight: '35%',
            }}
            type="submit"
            variant="contained"
            onMouseEnter={() => gestisciHover(true)}
            onMouseLeave={() => gestisciHover(false)}
            endIcon={<CheckIcon />}
          >
            Registrati
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegistrazioneMedico;
