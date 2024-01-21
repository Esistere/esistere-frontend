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
            margin: 'auto',
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: (theme) => theme.spacing(3),
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 3px 5px 2px rgba(155, 105, 135,.3)',
            color: '#5E35B1',
            width: '80%',
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'top',
              flexWrap: 'wrap',
            }}
          >
            <form className="formflex2">
              <div className="riga">
                <Avatar
                  alt={`${caregiverData.nome} ${caregiverData?.cognome}`}
                  src={avataricon}
                  sx={{
                    width: '30%',
                    height: 'auto',
                    aspectRatio: 1 / 1,
                  }}
                />
              </div>
            </form>
            <form>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{
                    color: 'blueviolet',
                    marginRight: '2px',
                  }}
                >
                  Nome:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.nome}
                </Typography>
              </div>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{ color: 'blueviolet', marginRight: '2px' }}
                >
                  Cognome:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.cognome}
                </Typography>
              </div>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{
                    color: 'blueviolet',
                    marginRight: '2px',
                  }}
                >
                  Indirizzo:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.indirizzo}
                </Typography>
              </div>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{ color: 'blueviolet', marginRight: '2px' }}
                >
                  Numero civico:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.numero_civico}
                </Typography>
              </div>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{ color: 'blueviolet', marginRight: '2px' }}
                >
                  Citta:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.citta}
                </Typography>
              </div>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{ color: 'blueviolet', marginRight: '2px' }}
                >
                  Data di nascita:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.data_di_nascita?.toISOString().split('T')[0]}
                </Typography>
              </div>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{ color: 'blueviolet', marginRight: '2px' }}
                >
                  Numero di telefono:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.numero_di_telefono}
                </Typography>
              </div>
              <div className="riga1">
                <Typography
                  variant="h6"
                  style={{ color: 'blueviolet', marginRight: '2px' }}
                >
                  Email:
                </Typography>
                <Typography variant="h6" style={{ color: 'black' }}>
                  {caregiverData.email}
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default DatiCaregiver;
