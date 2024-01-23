import React, { useEffect, useState } from 'react';
import Footer from 'app/components/Footer';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import Caricamento from 'app/components/gestione_app/Caricamento';
import Navbar from 'app/components/Navbar';
import { Link } from 'react-router-dom';

const HomeMedico: React.FC = () => {
  const [, setPazienti] = useState<Paziente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (): Promise<void> => {
    const medicoControl = new MedicoControl();

    try {
      const data = await medicoControl.fetchPazienti(
        Number(localStorage.getItem('id'))
      );
      setPazienti(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching pazienti:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Caricamento />;
  }

  return (
    <>
      <Navbar />
      <div id="div-medico">
        <br />
        <Box margin="2 em">
          <Grid container spacing={2} marginTop="2em">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" style={{ textAlign: 'right' }}>
                Visualizza la lista dei tuoi pazienti
              </Typography>
              <br />
              <Typography variant="h6" style={{ textAlign: 'right' }}>
                Per visualizzare la lista dei tuoi pazienti, clicca sul pulsante
                sottostante.
              </Typography>
              <Link
                to="/medico/lista"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  id="visualizzaPazienti"
                  variant="contained"
                  style={{
                    backgroundColor: 'blueviolet',
                    float: 'right',
                    marginTop: '0.5em',
                  }}
                >
                  Visualizza Pazienti
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6} md={5}>
              <CardMedia
                component="img"
                style={{ width: '25em', height: '18em', margin: 'auto' }}
                image={require('app/assets/images/paziente.png')}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={6} md={5}>
            <CardMedia
              component="img"
              style={{ width: '30em', height: '20em', margin: 'auto' }}
              image={require('app/assets/images/quizPreliminareMed.jpg')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4" gutterBottom>
                Visualizza o carica i quiz preliminare
              </Typography>
              <br />
              <Typography variant="h6" gutterBottom>
                Vedi o aggiungi i quiz preliminari nella piattaforma
                <br />
                Con i quiz preliminari hai la possibilità di capire come
                affrontare la situazione del paziente che stai seguendo
              </Typography>
              <Link
                to="/medico/quiz_preliminare"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'blueviolet',
                    float: 'left',
                    marginTop: '0.5em',
                  }}
                >
                  Quiz Preliminare
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </div>
      <br />

      <div>
        <Box margin="2 em">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box margin="0 2em">
                <Typography variant="h4" style={{ textAlign: 'right' }}>
                  Crea una nuova linea guida
                </Typography>
                <br />
                <Typography variant="h6" style={{ textAlign: 'right' }}>
                  Aiuta i tuoi pazienti e i caregiver alla creazione delle
                  attività da svolgere insieme ai pazienti tramite le tue linee
                  guida
                </Typography>
                <Link
                  to="/medico/lineeguidaform"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: 'blueviolet',
                      float: 'right',
                      marginTop: '0.5em',
                    }}
                  >
                    Linea Guida
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={5}>
              <CardMedia
                component="img"
                style={{ width: '25em', height: '18em', margin: 'auto' }}
                image={require('app/assets/images/LineeGuidaMed.jpg')}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default HomeMedico;
