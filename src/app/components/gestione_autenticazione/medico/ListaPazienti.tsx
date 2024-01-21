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

import { useNavigate } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist'; //todo
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'; //cg
import PsychologyIcon from '@mui/icons-material/Psychology'; //preliminare
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'; //tac
import QuizIcon from '@mui/icons-material/Quiz'; //quiz giornaliero
import AddIcon from '@mui/icons-material/Add'; //aggiungi todo
import Button from '@mui/material/Button';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import 'app/css/gestione_app/FormElements.css';

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
  const [isHoveredQuizGiornaliero, setIsHoveredQuizGiornaliero] =
    useState(false);
  const [isHoveredCg, setIsHoveredCg] = useState(false);
  const [isHoveredTac, setIsHoveredTac] = useState(false);

  const gestisciHoverQuizPreliminare = (hovered: boolean): void => {
    setIsHoveredQuizPreliminare(hovered);
  };

  const gestisciHoverTodoList = (hovered: boolean): void => {
    setIsHoveredTodoList(hovered);
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
              <div key={index} onClick={() => handlePazienteClick(paziente)}>
                <ElementoLista key={index} index={index} patient={paziente} />
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
              <Typography variant="h4">
                {selectedPaziente.codice_fiscale}
              </Typography>
              <Typography variant="h6">{selectedPaziente.nome}</Typography>

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
                    }}
                    variant="outlined"
                    onMouseEnter={() => gestisciHoverQuizPreliminare(true)}
                    onMouseLeave={() => gestisciHoverQuizPreliminare(false)}
                    startIcon={<PsychologyIcon />}
                  >
                    quiz preliminare
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
                    }}
                    onClick={() => {
                      navigate('/medico/crea_todolist', {
                        state: selectedPaziente.codice_fiscale,
                      });
                    }}
                    variant="outlined"
                    onMouseEnter={() => gestisciHoverTodoList(true)}
                    onMouseLeave={() => gestisciHoverTodoList(false)}
                    startIcon={<AddIcon />}
                  >
                    Crea todo list
                  </Button>
                </div>
                <div className="riga">
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
