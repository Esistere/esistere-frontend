import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import 'app/css/gestione_app/FormElements.css';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import Navbar from 'app/components/Navbar';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
} from '@mui/material';
import avataricon from 'app/assets/avatar-icon.png';
import CheckIcon from '@mui/icons-material/Check';
import Pulsante from 'app/components/gestione_app/Pulsante';
function AreaPersonaleMedico(): JSX.Element {
  const [medicoData, setMedicoData] = useState<Medico>({
    codice_identificativo: undefined,
    nome: '',
    cognome: '',
    indirizzo_studio: '',
    citta: '',
    numero_civico: '',
    numero_telefono_studio: '',
    email: '',
    passwd: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const medicoControl = new MedicoControl();
    if (isLoading) {
      const fetchMedicoData = async (): Promise<void> => {
        try {
          const idMedico = Number(localStorage.getItem('id'));
          const medico = await medicoControl.fetchDatiMedico(idMedico);
          setIsLoading(false);
          setMedicoData(medico);
        } catch (error) {
          console.error('Errore nel recupero dei dati del medico', error);
        }
      };

      fetchMedicoData();
    }
  }, [medicoData, isLoading]);

  const [disa, setDisa] = useState<boolean>(false);

  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setMedicoData({ ...medicoData, [name]: value });
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const medicoControl = new MedicoControl();

    const updateMedicoData = async (): Promise<void> => {
      try {
        if (medicoData) {
          const mdData: Medico = {
            ...medicoData,
          };
          await medicoControl.modificaMedico(mdData);
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati del medico', error);
      }
    };
    updateMedicoData();
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
            boxShadow: '0 3px 5px 2px rgba(155, 105, 135,.3)',
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
                  alt={`${medicoData?.nome} ${medicoData?.cognome}`}
                  src={avataricon}
                  sx={{ width: '30%', height: 'auto', aspectRatio: 1 / 1 }}
                />
              </div>
              <div className="riga">
                <Pulsante
                  tipologia="scuro"
                  nome="modifica"
                  testo="Modifica dati personali"
                  onClick={() => setDisa(false)}
                />
              </div>
            </div>
            <form className="formflex2" method="post" onSubmit={handleSubmit}>
              <div>
                <TextField
                  name="nome"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-nome"
                  label="Nome"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={medicoData.nome}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  name="cognome"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-cognome"
                  label="Cognome"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={medicoData.cognome}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  name="indirizzo_studio"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-indirizzo-studio"
                  label="Indirizzo Studio"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={medicoData.indirizzo_studio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  name="citta"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-citta"
                  label="Città"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={medicoData.citta}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  name="numero_civico"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-numero-civico"
                  label="Numero Civico"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={medicoData.numero_civico}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  name="numero_telefono_studio"
                  disabled={disa}
                  required
                  type="text"
                  id="outlined-numero-telefono-studio"
                  label="Numero Telefono Studio"
                  style={{
                    width: '16.15em',
                    margin: '1em',
                    boxSizing: 'border-box',
                  }}
                  value={medicoData.numero_telefono_studio}
                  onChange={handleChange}
                />
              </div>
              <div>
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
                  value={medicoData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
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
                  value={medicoData.passwd}
                  onChange={handleChange}
                />
              </div>
              <div className="riga">
                <Button
                  style={{
                    background: coloreBottone,
                    display: disa ? 'none' : 'block',
                    width: '9em',
                  }}
                  type="submit"
                  variant="contained"
                  onMouseEnter={() => gestisciHover(true)}
                  onMouseLeave={() => gestisciHover(false)}
                  startIcon={<CheckIcon />}
                >
                  Salva Dati
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default AreaPersonaleMedico;
