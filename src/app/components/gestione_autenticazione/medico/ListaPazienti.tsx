import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Navbar from 'app/components/Navbar';
import Caricamento from 'app/components/gestione_app/Caricamento';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import React, { useEffect, useState } from 'react';
import ElementoLista from './ElementoLista';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import QuizIcon from '@mui/icons-material/Quiz';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import 'app/css/gestione_app/FormElements.css';
import logo from 'app/assets/avatar-icon.png';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const drawerWidth = 338;

interface Props {
  window?: () => Window;
}

function ListaPazienti(props: Props): JSX.Element {
  const navigate = useNavigate();
  const [pazienti, setPazienti] = useState<Paziente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaziente, setSelectedPaziente] = useState<Paziente | null>(
    null
  );
  const handleGoBack = (): void => {
    navigate(-1);
  };

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

  const handlePazienteClick = (paziente: Paziente): void => {
    setSelectedPaziente(paziente);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const [isHoveredQuizPreliminare, setIsHoveredQuizPreliminare] =
    useState(false);
  const [isHoveredTodoList, setIsHoveredTodoList] = useState(false);
  const [isHoveredCreaTodoList, setIsHoveredCreaTodoList] = useState(false);
  const [isHoveredQuizGiornaliero, setIsHoveredQuizGiornaliero] =
    useState(false);

  const [isH, setIsH] = useState(false);
  const gestisciHoverH = (hovered: boolean): void => {
    setIsH(hovered);
  };
  const [isHoveredCg, setIsHoveredCg] = useState(false);
  const [isHoveredTac, setIsHoveredTac] = useState(false);

  const gestisciHoverQuizPreliminare = (hovered: boolean): void => {
    setIsHoveredQuizPreliminare(hovered);
  };

  const gestisciHoverTodoList = (hovered: boolean): void => {
    setIsHoveredTodoList(hovered);
  };
  const gestisciHoverCreaTodoList = (hovered: boolean): void => {
    setIsHoveredCreaTodoList(hovered);
  };
  const gestisciHoverQuizGiornaliero = (hovered: boolean): void => {
    setIsHoveredQuizGiornaliero(hovered);
  };

  const gestisciHoverCg = (hovered: boolean): void => {
    setIsHoveredCg(hovered);
  };

  const gestisciHoverTac = (hovered: boolean): void => {
    setIsHoveredTac(hovered);
  };
  const drawer = (
    <div>
      <div>
        <Toolbar />
        <List>
          {isLoading ? (
            <Caricamento />
          ) : pazienti.length === 0 ? (
            <p>Non ci sono pazienti.</p>
          ) : (
            pazienti.map((paziente, index) => (
              <div
                id={`paziente${index}`}
                key={index}
                onClick={() => handlePazienteClick(paziente)}
              >
                <ElementoLista
                  id={`paziente${index}`}
                  key={index}
                  index={index}
                  patient={paziente}
                />
                {index < pazienti.length - 1 && <Divider />}
              </div>
            ))
          )}
        </List>
      </div>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}em)` },
            background: 'blueviolet',
            height: '3.5em',
            marginTop: { xs: '3.5em' },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Pazienti
            </Typography>
          </Toolbar>
        </AppBar>
        <ArrowBackIcon
          onClick={handleGoBack}
          style={{
            color: 'blueviolet',
            position: 'absolute',
            zIndex: 9999,
            bottom: '1.5em',
            left: '1.5em',
            height: '2.5em',
            width: '2.5em',
            cursor: 'pointer',
          }}
        />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="pazienti"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          id="datiPaziente"
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: '100% ', md: `calc(100%- ${drawerWidth}em)` },
          }}
        >
          <Toolbar />
          {selectedPaziente ? (
            <div>
              <img
                className="propiclist"
                src={logo}
                style={{
                  float: 'left',
                  marginRight: '3em',
                  width: '14em',
                }}
                alt={`${selectedPaziente.nome} ${selectedPaziente.cognome}`}
              />
              <div style={{ marginTop: '4em' }}>
                <Typography variant="h4">
                  {selectedPaziente.nome} {selectedPaziente.cognome}
                </Typography>

                <Typography variant="h6">
                  {selectedPaziente.codice_fiscale}
                </Typography>

                <Typography variant="h6">
                  {selectedPaziente.data_di_nascita.toString().split('T')[0]}
                </Typography>

                <form className="formflex">
                  <div className="riga">
                    <Button
                      style={{
                        color: isHoveredQuizPreliminare ? '#ffffff' : '#8036a1',
                        borderColor: '#000000',
                        backgroundColor: isHoveredQuizPreliminare
                          ? '#b2a1c7'
                          : '#ffffff',
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        height: '4.5em',
                      }}
                      variant="outlined"
                      onMouseEnter={() => gestisciHoverQuizPreliminare(true)}
                      onMouseLeave={() => gestisciHoverQuizPreliminare(false)}
                      startIcon={<PsychologyIcon />}
                      onClick={() => {
                        navigate('/medico/crea_quiz_preliminare', {
                          state: selectedPaziente.codice_fiscale,
                        });
                      }}
                    >
                      Aggiungi quiz preliminare
                    </Button>
                    <Button
                      style={{
                        color: isHoveredQuizPreliminare ? '#ffffff' : '#8036a1',
                        borderColor: '#000000',
                        backgroundColor: isH ? '#b2a1c7' : '#ffffff',
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        height: '4.5em',
                      }}
                      variant="outlined"
                      onMouseEnter={() => gestisciHoverH(true)}
                      onMouseLeave={() => gestisciHoverH(false)}
                      startIcon={<DocumentScannerIcon />}
                      onClick={() => {
                        navigate('/medico/visualizza_quiz_preliminare', {
                          state: selectedPaziente.codice_fiscale,
                        });
                      }}
                    >
                      Visualizza quiz preliminare
                    </Button>
                    <Button
                      style={{
                        color: isHoveredTodoList ? '#ffffff' : '#8036a1',
                        borderColor: '#000000',
                        backgroundColor: isHoveredTodoList
                          ? '#b2a1c7'
                          : '#ffffff',
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        height: '4.5em',
                      }}
                      onClick={() => {
                        navigate('/medico/visualizza_todolist', {
                          state: selectedPaziente.codice_fiscale,
                        });
                      }}
                      variant="outlined"
                      onMouseEnter={() => gestisciHoverTodoList(true)}
                      onMouseLeave={() => gestisciHoverTodoList(false)}
                      startIcon={<ChecklistIcon />}
                    >
                      lista todo list
                    </Button>
                  </div>
                  <div className="riga">
                    <Button
                      id="crea-todolist-button"
                      style={{
                        color: isHoveredCreaTodoList ? '#ffffff' : '#8036a1',
                        borderColor: '#000000',
                        backgroundColor: isHoveredCreaTodoList
                          ? '#b2a1c7'
                          : '#ffffff',
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        height: '4.5em',
                      }}
                      onClick={() => {
                        navigate('/medico/crea_todolist', {
                          state: selectedPaziente.codice_fiscale,
                        });
                      }}
                      variant="outlined"
                      onMouseEnter={() => gestisciHoverCreaTodoList(true)}
                      onMouseLeave={() => gestisciHoverCreaTodoList(false)}
                      startIcon={<AddIcon />}
                    >
                      Crea todo list
                    </Button>
                    <Button
                      style={{
                        color: isHoveredQuizGiornaliero ? '#ffffff' : '#8036a1',
                        borderColor: '#000000',
                        backgroundColor: isHoveredQuizGiornaliero
                          ? '#b2a1c7'
                          : '#ffffff',
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        height: '4.5em',
                      }}
                      variant="outlined"
                      onMouseEnter={() => gestisciHoverQuizGiornaliero(true)}
                      onMouseLeave={() => gestisciHoverQuizGiornaliero(false)}
                      startIcon={<QuizIcon />}
                      onClick={() => {
                        navigate('/medico/visualizza_quiz_allenamento', {
                          state: selectedPaziente.cg_fam,
                        });
                      }}
                    >
                      quiz Allenamento
                    </Button>

                    <Button
                      style={{
                        color: isHoveredCg ? '#ffffff' : '#8036a1',
                        borderColor: '#000000',
                        backgroundColor: isHoveredCg ? '#b2a1c7' : '#ffffff',
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        height: '4.5em',
                      }}
                      variant="outlined"
                      onMouseEnter={() => gestisciHoverCg(true)}
                      onMouseLeave={() => gestisciHoverCg(false)}
                      startIcon={<PersonRoundedIcon />}
                      onClick={() => {
                        navigate('/medico/visualizza_caregiver', {
                          state: selectedPaziente.cg_fam,
                        });
                      }}
                    >
                      profilo caregiver
                    </Button>

                    <Button
                      style={{
                        color: isHoveredTac ? '#ffffff' : '#8036a1',
                        borderColor: '#000000',
                        backgroundColor: isHoveredTac ? '#b2a1c7' : '#ffffff',
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        height: '4.5em',
                      }}
                      onClick={() => {
                        navigate('/medico/crea_tac', {
                          state: selectedPaziente.codice_fiscale,
                        });
                      }}
                      variant="outlined"
                      onMouseEnter={() => gestisciHoverTac(true)}
                      onMouseLeave={() => gestisciHoverTac(false)}
                      startIcon={<QuestionMarkIcon />}
                    >
                      tac
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <Typography paragraph>
              Seleziona un paziente per visualizzare i dati.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ListaPazienti;
