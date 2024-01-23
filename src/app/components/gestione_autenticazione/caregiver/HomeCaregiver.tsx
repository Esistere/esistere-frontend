import React, { useEffect, useState } from 'react';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import Caricamento from 'app/components/gestione_app/Caricamento';
import Footer from 'app/components/Footer';
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import Navbar from 'app/components/Navbar';
import { Link } from 'react-router-dom';

const HomeCaregiver: React.FC = () => {
  // const [caregiver, setCaregiver] = useState<CaregiverFamiliare[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (): Promise<void> => {
    const caregiverFamiliareControl = new CaregiverFamiliareControl();

    try {
      const data = await caregiverFamiliareControl.fetchDatiCaregiverFamiliare(
        Number(localStorage.getItem('id'))
      );

      console.log(data);
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
  return (
    <>
      <Navbar />
      <Box margin="2 em 2 em">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box margin="2em">
              <div id="div-caregiver">
                <Typography variant="h4" style={{ textAlign: 'right' }}>
                  Supporta il tuo paziente entrando nel suo mondo tramite il
                  Sage Test
                </Typography>
              </div>
              <br />
              <Typography variant="h6" style={{ textAlign: 'right' }}>
                I risultati ti guideranno nella creazione di attività e storie
                mirate, rendendo ogni momento più significativo.
              </Typography>
              <Link
                to="/caregiver/compila_quiz_preliminare"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'blueviolet',
                    float: 'right',
                    marginTop: '0.5em',
                  }}
                >
                  Fai il Sage Test
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              style={{ width: '32em', height: '22em', margin: 'auto' }}
              image={require('app/assets/images/cgpaziente.png')}
            />
          </Grid>
        </Grid>
      </Box>
      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              style={{ width: '30em', height: '20em', marginBottom: 'auto' }}
              image={require('app/assets/images/ToDoList1.jpg')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="2em">
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
              <Link to="/caregiver/visualizza_todolist">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'blueviolet',
                    float: 'left',
                    marginTop: '0.5em',
                  }}
                >
                  Visualizza ToDo List
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </div>
      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box margin="2em">
              <Typography variant="h4" style={{ textAlign: 'right' }}>
                Crea un nuovo Quiz di allenamento giornaliero per allenare la
                mente
              </Typography>
              <br />
              <Typography variant="h6" style={{ textAlign: 'right' }}>
                Personalizza domande e risposte per stimolare la mente del tuo
                paziente con argomenti che possano suscitare interesse. Clicca
                sul pulsante sottostante per iniziare a creare un nuovo quiz
                personalizzato.
              </Typography>
              <Link to="/caregiver/quiz_allenamento">
                <Button
                  id='button-quiz-allenamento'
                  variant="contained"
                  style={{
                    backgroundColor: 'blueviolet',
                    float: 'right',
                    marginTop: '0.5em',
                  }}
                >
                  Crea Quiz
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              style={{ width: '25em', height: '30em', margin: 'auto' }}
              image={require('app/assets/images/QuizAllenamento.png')}
            />
          </Grid>
        </Grid>
      </div>

      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              style={{ width: '30em', height: '20em', margin: 'auto' }}
              image={require('app/assets/images/storia.png')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="2em">
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
              <Link to="/caregiver/crea_storia">
                <Button
                  variant="contained"
                  id="creaStoria"
                  style={{ backgroundColor: 'blueviolet', marginTop: '0.5em' }}
                >
                  Storia
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </div>

      <br />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box margin="2em">
              <Typography variant="h4" style={{ textAlign: 'right' }}>
                Inventa una nuova filastrocca
              </Typography>
              <br />
              <Typography variant="h6" style={{ textAlign: 'right' }}>
                Aiuta il paziente a ricordare momenti quotidiani utilizzando le
                filastrocche. Clicca il pulsante qui sotto per esprimere la
                fantasia attraverso le parole nel modulo che uscirà dopo aver
                cliccato il pulsante qui sotto.
              </Typography>
              <Link to="/caregiver/crea_filastrocca">
                <Button
                  variant="contained"
                  id="creaFilastrocca"
                  style={{
                    backgroundColor: 'blueviolet',
                    float: 'right',
                    marginTop: '0.5em',
                  }}
                >
                  Filastrocca
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="2em 16em">
              <CardMedia
                component="img"
                style={{ width: '25em', height: '22em', margin: 'auto' }}
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
