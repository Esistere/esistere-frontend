import React, { useEffect, useState } from 'react';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import Caricamento from 'app/components/gestione_app/Caricamento';
import Footer from 'app/components/Footer';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardMedia,
  Grid,
  Link,
  Typography,
  styled,
} from '@mui/material';
import Navbar from 'app/components/Navbar';
import { Container, ThemeProvider } from '@mui/system';
import { theme } from 'app/components/gestione_app/FormTheme';

const HomeCaregiver: React.FC = () => {
  const [caregiver, setCaregiver] = useState<CaregiverFamiliare[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const aspectRatio = 16 / 9;

  const fetchData = async (): Promise<void> => {
    const caregiverFamiliareControl = new CaregiverFamiliareControl();

    try {
      const data = await caregiverFamiliareControl.fetchDatiCaregiverFamiliare(
        Number(localStorage.getItem('id'))
      );
      //setCaregiver(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dati caregiver familiare:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Caricamento />;
  }
  /*const images = [
    {
      url: 'app/assets/images/storia.png',
      title: 'scrivi una storia',
      width: '40',
      path: 'app/components/gestione_storia/creaStoria.js',
    },

    {
      url: 'app/assets/images/ToDoList.png',
      title: 'compila la ToDoList',
      width: '40',
    },

    {
      url: 'app/assets/images/quizAllenamento.jpg',
      title: 'crea un nuovo quiz',
      width: '40',
    },

    {
      url: 'app/assets/images/filastrocca.png',
      title: 'componi una filastrocca',
      width: '40',
    },
  ];

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));
*/
  return (
    <>
      <Navbar />
      <Box margin="2 em 2 em">
        <Grid container spacing={2}>
          {/* Primo div con testo a sinistra e immagine a destra */}
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4" gutterBottom>
                Supporta il tuo paziente entrando nel suo mondo tramite il Sage
                Test
              </Typography>
              <br />
              <Typography variant="h6" gutterBottom>
                I risultati ti guideranno nella creazione di attività e storie
                mirate, rendendo ogni momento più significativo.
              </Typography>
              <Button variant="contained" color="primary">
                Bottone
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              style={{ width: '32em', height: '22em', marginBottom: '1em' }}
              image={require('app/assets/images/cgpaziente.png')}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      <div>
        <Grid container spacing={2}>
          {/* Secondo div con immagine a sinistra e testo a destra */}
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <CardMedia
                component="img"
                style={{ width: '30em', height: '20em', marginBottom: '1em' }}
                image={require('app/assets/images/ToDoList1.jpg')}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4" gutterBottom>
                Visualizza la To-Do List che il medico ha preparato
                appositamente per te
              </Typography>
              <br />
              <Typography variant="h6" gutterBottom>
                Una lista dettagliata delle attività pianificate per il paziente
                <br />
                Aggiorna lo stato delle attività per tenere traccia del
                progresso e per aiutare il medico ad adattarsi alle tue
                esigenze.
              </Typography>
              <Button variant="contained" color="primary">
                Bottone
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4" gutterBottom>
                Crea un nuovo Quiz di allenamento giornaliero
              </Typography>
              <br />
              <Typography variant="h6" gutterBottom>
                Personalizza domande e risposte per stimolare la mente del tuo
                paziente con argomenti che possano suscitare interesse.
                <br />
                Clicca sul pulsante sottostante per iniziare a creare un nuovo
                quiz personalizzato.
              </Typography>
              <Button variant="contained" color="primary">
                Bottone
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="2em 16em">
              <CardMedia
                component="img"
                style={{ width: '25em', height: '22em', marginBottom: '1em' }}
                image={require('app/assets/images/QuizAllenamento.png')}
              />
            </Box>
          </Grid>
        </Grid>
      </div>

      <br />

      <div>
        <Grid container spacing={2}>
          {/* Secondo div con immagine a sinistra e testo a destra */}
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <CardMedia
                component="img"
                style={{ width: '30em', height: '20em', marginBottom: '1em' }}
                image={require('app/assets/images/storia.png')}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4" gutterBottom>
                Scrivi una nuova storia
              </Typography>
              <br />
              <Typography variant="h6" gutterBottom>
                Scrivi una storia che possa risvegliare sorrisi e gioia nel
                paziente. Potrebbe essere un viaggio nei ricordi o anche un
                evento quotidiano.
                <br />
                Lascia che le parole fluiscono nel modulo che uscirà dopo aver
                cliccato il pulsante qui sotto.
              </Typography>
              <Button variant="contained" color="primary">
                Bottone
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>

      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box margin="0 2em">
              <Typography variant="h4" gutterBottom>
                Scrivi una nuova filastrocca
              </Typography>
              <br />
              <Typography variant="h6" gutterBottom>
                Aiuta il paziente a ricordare momenti o gesti quotidiani tramite
                le filastrocche.
                <br />
                Lascia che la fantasia e le parole vengano rilasciate nel modulo
                che uscirà dopo aver cliccato il pulsante:
              </Typography>
              <Button variant="contained" color="primary">
                Bottone
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="2em 16em">
              <CardMedia
                component="img"
                style={{ width: '25em', height: '22em', marginBottom: '1em' }}
                image={require('app/assets/images/filastrocca.png')}
              />
            </Box>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </>
  );
};

export default HomeCaregiver;
