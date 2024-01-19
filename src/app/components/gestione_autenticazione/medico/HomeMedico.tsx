import React, { useEffect, useState } from 'react';
import Footer from 'app/components/Footer';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import Caricamento from 'app/components/gestione_app/Caricamento';
import Navbar from 'app/components/Navbar';
import cgpaziente from 'app/assets/images/cgpaziente.png';
import filastrocca from 'app/assets/images/filastrocca.png';
import lineaguida from 'app/assets/images/lineaguida.jpg';
import { Link } from 'react-router-dom';
import Slider from 'app/components/gestione_app/Slider';


const images = [cgpaziente, filastrocca, lineaguida, lineaguida];
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
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          height: '500px',
          margin: '0 auto',
        }}
      >
        Grafico
        <Slider images={images} />
      </div>
      <br />
      <Box margin="2 em">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4">
                Visualizza la lista dei tuoi pazienti
              </Typography>
              <br />
              <Typography variant="h6">
                Per visualizzare la lista dei tuoi pazienti, clicca sul pulsante
                sottostante.
              </Typography>
              <Link
                to="/medico/visualizza_pazienti"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button variant="contained" color="primary">
                  Visualizza Pazienti
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={5}>
            <Box margin="2em">
              <CardMedia
                component="img"
                style={{ width: '25em', height: '18em', marginBottom: '1em' }}
                image={require('app/assets/images/paziente.png')}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={6} md={5}>
            <Box margin=" 2em">
              <CardMedia
                component="img"
                style={{ width: '30em', height: '20em', marginBottom: '1em' }}
                image={require('app/assets/images/quizPreliminareMed.jpg')}
              />
            </Box>
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
                <Button variant="contained" color="primary">
                  Quiz Preliminare
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </div>
      <br />

      <Box margin="2 em">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4">Crea una nuova linea guida</Typography>
              <br />
              <Typography variant="h6">
                Aiuta i tuoi pazienti e i caregiver alla creazione delle
                attività da svolgere tramite le tue linee guida
              </Typography>
              <Link
                to="/medico/LineaGuida"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button variant="contained" color="primary">
                  Linea Guida
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={5}>
            <Box margin="2em">
              <CardMedia
                component="img"
                style={{ width: '25em', height: '18em', marginBottom: '1em' }}
                image={require('app/assets/images/LineeGuidaMed.jpg')}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <br />
      <Footer />
    </>
  );
};

export default HomeMedico;
