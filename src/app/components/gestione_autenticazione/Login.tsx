import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from 'app/assets/logo512.png';
import LoginControl from 'app/control/gestione_autenticazione/LoginControl';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType, useUser } from './UserProvider';
import Pulsante from '../gestione_app/Pulsante';
import Caricamento from '../gestione_app/Caricamento';
import { emailRegex, passwordRegex } from 'app/regex';
import Navbar from '../Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { userType, loading } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    passwd: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = (): void =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  // Snackbar
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const utente = {
      email: formData.email,
      passwd: formData.passwd,
    };

    if (!isEmailValid || !isPassValid) {
      return;
    }

    const loginControl = new LoginControl();
    loginControl
      .login(utente.email, utente.passwd)
      .then((value) => {
        switch (value) {
          case UserType.medico:
            navigate('/medico');
            window.location.reload();
            break;
          case UserType.caregiver:
            navigate('/caregiver');
            window.location.reload();
            break;
          default:
            console.error('Tipo di utente non gestito');
        }
      })
      .catch((e) => {
        setOpen(true);
        console.log(e);
      });
  };

  // If the user is already logged in, redirect to the home page
  useEffect(() => {
    if (!loading) {
      if (userType !== null) {
        navigate('/');
      }
    }
  }, [userType, loading, navigate]);

  if (loading) {
    return <Caricamento />;
  }

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            marginTop: '3em',
            marginBottom: '3em',
          }}
        >
          <CssBaseline />
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: (theme) => theme.spacing(3),
              backgroundColor: '#EDE7F6',
              boxShadow: '0 3px 5px 2px rgba(155, 105, 135, .3)',
              bgcolor: 'white',
              color: '#5E35B1',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: '100px', marginTop: '20px' }}
            />
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              sx={{ mt: 2, fontWeight: 'bold' }}
            >
              Accedi
            </Typography>
            <CardContent>
              <form method="post" onSubmit={handleSubmit}>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    type="email"
                    margin="normal"
                    required
                    sx={{ width: '20em' }}
                    id="email"
                    label="Email"
                    name="email"
                    error={!isEmailValid && formData.email.length > 0}
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    color="primary"
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <div
                      style={{
                        color: '#D32F2F',
                      }}
                    >
                      {emailError}
                    </div>
                  )}
                  <TextField
                    margin="normal"
                    required
                    sx={{ width: '20em' }}
                    name="passwd"
                    label="Password"
                    error={!isPassValid && formData.passwd.length > 0}
                    id="password"
                    autoComplete="current-password"
                    variant="outlined"
                    color="primary"
                    onChange={handlePasswordChange}
                    type={showPassword ? 'text' : 'password'}
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
                  />
                  {passwordError && (
                    <div
                      style={{
                        color: '#D32F2F',
                      }}
                    >
                      {passwordError}
                    </div>
                  )}
                  <Pulsante
                    name="login"
                    tipologia="scuro"
                    testo="Accedi"
                    nome="login"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                  />

                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: '100%' }}
                    >
                      Login Fallito!
                    </Alert>
                  </Snackbar>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Non hai un account?{' '}
                    <Link
                      to="/registrazione"
                      style={{
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      Registrati qui
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login;
