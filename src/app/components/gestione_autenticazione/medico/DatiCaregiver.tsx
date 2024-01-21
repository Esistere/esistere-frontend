import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';

import Typography from '@mui/material/Typography';
import Navbar from 'app/components/Navbar';

import {
  Avatar,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
} from '@mui/material';
import avataricon from 'app/assets/avatar-icon.png';

function DatiCaregiver(): JSX.Element {
  const location = useLocation();
  const id = location.state;

  const [caregiverData, setCaregiverData] = useState<
    Partial<CaregiverFamiliare>
  >({
    codice_identificativo: undefined,
    nome: '',
    cognome: '',
    indirizzo: '',
    numero_civico: '',
    citta: '',
    numero_di_telefono: '',
    data_di_nascita: new Date(),
    email: '',
    passwd: '',
  });

  useEffect(() => {
    const caregiverControl = new CaregiverFamiliareControl();

    const fetchCaregiverData = async (): Promise<void> => {
      try {
        const caregiver = await caregiverControl.fetchDatiCaregiverFamiliare(
          id
        );

        if (caregiver.data_di_nascita) {
          const parsedDate = new Date(caregiver.data_di_nascita);
          setCaregiverData({
            ...caregiver,
            data_di_nascita: parsedDate,
          });
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati del caregiver', error);
      }
    };

    fetchCaregiverData();
  }, [id]);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Card
          sx={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: (theme) => theme.spacing(3),
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 3px 5px 2px rgba(155, 105, 135,.3)',
            color: '#5E35B1',
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'wrap',
              margin: 'auto',
            }}
          >
            <div className="formflex2">
              <div className="riga">
                <Avatar
                  alt={`${caregiverData.nome} ${caregiverData?.cognome}`}
                  src={avataricon}
                  sx={{ width: '40%', height: 'auto', aspectRatio: 1 / 1 }}
                />
              </div>

              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Typography variant="h4">Nome:</Typography>
                  <Typography variant="h5">{caregiverData.nome}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Cognome:</Typography>
                  <Typography variant="h5">{caregiverData.cognome}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Indirizzo:</Typography>
                  <Typography variant="h5">
                    {caregiverData.indirizzo}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h4">Numero civico:</Typography>
                  <Typography variant="h5">
                    {caregiverData.numero_civico}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h4">Citta:</Typography>
                  <Typography variant="h5">{caregiverData.citta}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Data di nascita:</Typography>
                  <Typography variant="h5">
                    {caregiverData.data_di_nascita?.toISOString().split('T')[0]}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Numero di telefono:</Typography>
                  <Typography variant="h5">
                    {caregiverData.numero_di_telefono}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">email:</Typography>
                  <Typography variant="h5">{caregiverData.email}</Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default DatiCaregiver;
