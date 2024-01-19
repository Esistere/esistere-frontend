import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import 'app/css/gestione_app/FormElements.css';
import { emailRegex, passwordRegex } from 'app/regex';
import { theme } from 'app/components/gestione_app/FormTheme';

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
  const [emailError, setEmailError] = useState('');
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      email: newEmail,
    }));

    const isValid = emailRegex.test(newEmail) || newEmail === '';
    setIsEmailValid(isValid);

    if (!isValid) {
      setEmailError('Inserisci un indirizzo email valido.');
    } else {
      setEmailError('');
    }
  };

  const [isPassValid, setIsPassValid] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState('');
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPass = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      passwd: newPass,
    }));

    const isValid = passwordRegex.test(newPass) || newPass === '';
    setIsPassValid(isValid);

    if (!isValid) {
      setPasswordError('Inserisci una password valida.');
    } else {
      setPasswordError('');
    }
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
        setSuccess(true);
        setOpen(true);
      })
      .catch(() => {
        setSuccess(false);
        setOpen(true);
      });
  };

  const [success, setSuccess] = useState<boolean | null>(null);

  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Card
            sx={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              padding: (theme) => theme.spacing(3),
              backgroundColor: 'white',
              boxShadow: '0 3px 5px 2px rgba(155, 105, 135, .3)',
              color: '#5E35#1',
            }}
          >
            <CardContent
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                id="med-title"
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                Diventa uno dei nostri Medici!
              </Typography>

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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                    value={formData.email}
                    onChange={handleEmailChange}
                    label="Email"
                    error={!isEmailValid && formData.email.length > 0}
                    style={{
                      flexBasis: 'calc(26 em)',
                      margin: '1em',
                      boxSizing: 'border-box',
                      marginLeft: '20%',
                      marginRight: '20%',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                  />
                  {emailError && (
                    <div
                      style={{
                        color: '#D32F2F',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {emailError}
                    </div>
                  )}
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
                    value={formData.passwd}
                    label="Password"
                    error={!isPassValid && formData.passwd.length > 0}
                    style={{
                      flexBasis: '26em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <div
                      style={{
                        color: '#D32F2F',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {passwordError}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <Button
                    style={{
                      background: coloreBottone,
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
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success
            ? 'Registrazione effettuata con successo!'
            : 'Registrazione fallita'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegistrazioneMedico;