import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import 'app/css/gestione_app/FormElements.css';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Pulsante from 'app/components/gestione_app/Pulsante';
import avataricon from 'app/assets/avatar-icon.png';
import Navbar from 'app/components/Navbar';

function AreaPersonaleCaregiver(): JSX.Element {
  const [caregiverData, setCaregiverData] = useState<CaregiverFamiliare>({
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

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const caregiverControl = new CaregiverFamiliareControl();
    if (isLoading) {
      const fetchCaregiverData = async (): Promise<void> => {
        try {
          const idCaregiver = Number(localStorage.getItem('id'));
          const caregiver = await caregiverControl.fetchDatiCaregiverFamiliare(
            idCaregiver
          );
          if (caregiver.data_di_nascita) {
            const parsedDate = new Date(caregiver.data_di_nascita);

            setCaregiverData({
              ...caregiver,
              data_di_nascita: parsedDate,
            });
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Errore nel recupero dei dati del caregiver', error);
        }
      };
      fetchCaregiverData();
    }
  }, [caregiverData, isLoading]);

  const [disa, setDisa] = useState<boolean>(true);

  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === 'data_di_nascita') {
      const newValue = new Date(value);
      setCaregiverData((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    } else {
      setCaregiverData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const caregiverControl = new CaregiverFamiliareControl();

    const updateCaregiverData = async (): Promise<void> => {
      try {
        if (caregiverData) {
          const cgData: CaregiverFamiliare = {
            ...caregiverData,
            data_di_nascita: new Date(caregiverData.data_di_nascita),
          };
          await caregiverControl.modificaCaregiverFamiliare(cgData);
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati del caregiver', error);
      }
    };

    updateCaregiverData();
  };

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
            padding: (theme) => theme.spacing(3),
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 3px 5px 2px rgba(155, 105, 135, .3)',
            color: '#5E35B1',
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'rows',
              alignItems: 'top',
              flexWrap: 'wrap',
            }}
          >
            <div className="formflex2">
              <div className="riga">
                <Avatar
                  alt={`${caregiverData?.nome} ${caregiverData?.cognome}`}
                  src={avataricon}
                  sx={{ width: '30%', height: 'auto', aspectRatio: 1 / 1 }}
                />
              </div>
              <div className="riga">
                <Pulsante
                  tipologia="scuro"
                  nome="modifica"
                  testo="Modifica Dati Personali"
                  onClick={() => setDisa(false)}
                />
              </div>
            </div>
            <form className="formflex2" method="post" onSubmit={handleSubmit}>
              <div className="riga">
                <TextField
                  name="nome"
                  disabled={disa}
                  required
                  type="text"
                  id="outline-nome"
                  label="Nome"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.nome}
                  onChange={handleChange}
                />

                <TextField
                  name="cognome"
                  disabled={disa}
                  required
                  type="text"
                  id="outline-cognome"
                  label="Cognome"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.cognome}
                  onChange={handleChange}
                />
              </div>
              <div className="riga">
                <TextField
                  name="indirizzo"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-indirizzo"
                  label="Indirizzo"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.indirizzo}
                  onChange={handleChange}
                />
                <TextField
                  name="numero_civico"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-numero_civivo"
                  label="Numero Civico"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.numero_civico}
                  onChange={handleChange}
                />
              </div>
              <div className="riga">
                <TextField
                  name="citta"
                  disabled={disa}
                  required
                  type="text"
                  id="outline-citta"
                  label="Città"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.citta}
                  onChange={handleChange}
                />
                <TextField
                  name="data_di_nascita"
                  disabled={disa}
                  required
                  type="date"
                  id="outlined-data"
                  label="Data di Nascita"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={
                    caregiverData.data_di_nascita.toISOString().split('T')[0]
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="riga">
                <TextField
                  name="numero_di_telefono"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-telefono"
                  label="Telefono"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.numero_di_telefono}
                  onChange={handleChange}
                />
                <TextField
                  name="email"
                  disabled={disa}
                  required
                  type="email"
                  id="outlined-Email"
                  label="Email"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="riga">
                <TextField
                  name="passwd"
                  disabled={disa}
                  required
                  type="password"
                  id="outlined-password"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={caregiverData.passwd}
                  onChange={handleChange}
                />
              </div>
              <div className="riga">
                <Button
                  style={{
                    background: coloreBottone,
                    display: disa ? 'none' : 'block',
                  }}
                  type="submit"
                  variant="contained"
                  onMouseEnter={() => gestisciHover(true)}
                  onMouseLeave={() => gestisciHover(false)}
                  endIcon={<CheckIcon />}
                >
                  Salva dati
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default AreaPersonaleCaregiver;
