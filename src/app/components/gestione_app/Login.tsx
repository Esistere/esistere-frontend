import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginControl from 'app/control/gestione_autenticazione/LoginControl';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from './UserProvider';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import logo from 'app/assets/logo512.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2',
    },
  },
});

function Login(): JSX.Element {
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

  return (
    <form method="post" onSubmit={handleSubmit}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Card
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: (theme) => theme.spacing(3),
              backgroundColor: '#EDE7F6',
              borderRadius: '10px',
              boxShadow: '0 3px 5px 2px rgba(155, 105, 135, .3)',
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
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Indirizzo Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="outlined"
                  color="primary"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwd"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  color="primary"
                  onChange={(event) => handleChange(event)}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                >
                  Accedi
                </Button>
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
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </form>
  );
}

export default Login;
