import React, { useEffect } from 'react';
import { useUser, UserType } from './gestione_autenticazione/UserProvider';
import { useNavigate } from 'react-router-dom';
import Caricamento from './gestione_app/Caricamento';
import Navbar from './Navbar';
import Footer from './Footer';
import 'app/css/gestione_app/App.css';
import { Box, CardMedia, Grid, Typography } from '@mui/material';

function App(): JSX.Element {
  const { userType, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (userType === UserType.medico) {
        navigate('/medico');
      } else if (userType === UserType.caregiver) {
        navigate('/caregiver');
      }
    }
  }, [userType, loading, navigate]);

  if (loading) {
    return <Caricamento />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="intro">
          <h1>Benvenuto su Esistere</h1>
        </div>
        <div>
          <Box margin="5 em">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  style={{ width: '25em', height: '25em', margin: 'auto' }}
                  image={require('app/assets/images/Alzheimer.jpg')}
                />
              </Grid>
              <Grid item xs={6} md={5}>
                <Typography
                  variant="h5"
                  style={{ textAlign: 'left', marginTop: '4em' }}
                >
                  L &apos;Alzheimer è una malattia neurodegenerativa che
                  colpisce il cervello, causando perdita progressiva di memoria
                  e funzioni cognitive, influenzando la vita quotidiana delle
                  persone.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div>
          <Box margin="2 em">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box margin="2em">
                  <Typography variant="h5" style={{ textAlign: 'right' }}>
                    Lo scopo di Esistere è quello di aiutare i medici nel lato
                    della cura e nel percorso di terapia. E aiutare i caregiver
                    per permettere al paziente di non sentirsi solo in questo
                    percorso difficile da affrontare.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={5}>
                <CardMedia
                  component="img"
                  style={{
                    width: '25em',
                    height: '18em',
                    margin: 'auto',
                    marginBottom: '4em',
                  }}
                  image={require('app/assets/images/supporto.png')}
                />
              </Grid>
            </Grid>
          </Box>
        </div>

        <div>
          <Box margin="5 em">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  style={{ width: '25em', height: '30em', margin: 'auto' }}
                  image={require('app/assets/images/sagetest.jpg')}
                />
              </Grid>
              <Grid item xs={6} md={5}>
                <Typography
                  variant="h5"
                  style={{ textAlign: 'left', marginTop: '4em' }}
                >
                  Offriamo come mezzo di supporto per medici e caregiver il SAGE
                  Test. Uno strumento di autovalutazione cognitiva, che esamina
                  memoria, ragionamento e altre funzioni cognitive, fornendo
                  un&apos; indicazione preliminare del declino cognitivo.
                </Typography>

                <Typography
                  variant="h6"
                  style={{ textAlign: 'left', marginTop: '1.5em' }}
                >
                  Per avere maggiori informazioni a riguardo&nbsp;
                  <a
                    href="https://t.ly/CQPJr"
                    style={{
                      textDecoration: 'none',
                      color: 'blueviolet',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    clicca qui
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div>
          <Box margin="2 em">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box margin="2em">
                  <Typography
                    variant="h5"
                    style={{ textAlign: 'right', marginTop: '4em' }}
                  >
                    Offriamo ai caregiver e familiari la possibilità di scrivere
                    quiz di allenamento pesonalizzati, filastrocche e storie,
                    permettendo di coinvolgere il paziente nei momenti
                    quotidiani delle persone care o anche di rivivere dei
                    ricordi.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={5}>
                <CardMedia
                  component="img"
                  style={{
                    width: '28em',
                    height: '24em',
                    margin: 'auto',
                    marginBottom: '4em',
                  }}
                  image={require('app/assets/images/famiglia.jpg')}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
