import React, { useEffect, useState } from 'react';
import ElementoListaQuizAllenamentoGiornaliero from './ElementoListaQA';
import Navbar from '../Navbar';
import QuizAllenamentoControl from 'app/control/gestione_quiz_allenamento/QuizAllenamentoControl';
import { useUser } from '../gestione_autenticazione/UserProvider';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';
import Caricamento from '../gestione_app/Caricamento';
import 'app/css/gestione_app/FormElements.css';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import AccessoNegato from '../gestione_autenticazione/AccessoNegato';
import { ResponseObject } from 'app/interfaces/gestione_autenticazione/utils/ResponseObject';
import { useLocation } from 'react-router-dom';

const drawerWidth = 338;
interface Props {
  window?: () => Window;
}

function ListaQuizAllenamentoMedico(props: Props): JSX.Element {
  const [quizAllenamento, setQuizAllenamento] = useState<
    QuizAllenamentoGiornaliero[]
  >([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuizAllenamento, setSelectedQuizAllenamento] =
    useState<ResponseObject | null>(null);
  const { userType, loading } = useUser();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const quizAllenamentoControl = new QuizAllenamentoControl();
        const id = location.state;
        const data = await quizAllenamentoControl.fetchQuizAllenamentoByCgFam(
          id
        );
        console.log(data);

        setQuizAllenamento(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quiz', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colore = (
    corretta: boolean | undefined,
    selezionata: boolean | undefined
  ): string => {
    if (corretta === true && selezionata === true) {
      return 'forestgreen';
    } else if (selezionata === true && corretta === false) {
      return 'crimson';
    } else if (selezionata === false && corretta === true) {
      return 'blueviolet';
    } else {
      return 'black';
    }
  };

  const handleQuizAllenamentoClick = async (
    quizAllenamento: QuizAllenamentoGiornaliero
  ): Promise<void> => {
    const quizAllenamentoControl = new QuizAllenamentoControl();
    const quiz = await quizAllenamentoControl.visualizzaQuizAllenamento(
      Number(quizAllenamento.id)
    );
    Object.values(quiz.domandeRisposte).map((domandaRisposta) => {
      domandaRisposta.corretta === true
        ? setPunteggio_totale(punteggio_totale + 1)
        : null;
    });
    setSelectedQuizAllenamento(quiz);
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {isLoading ? (
          <Caricamento />
        ) : quizAllenamento.length === 0 ? (
          <p>Non ci sono quiz.</p>
        ) : (
          quizAllenamento.map((quizAllenamento, index) => (
            <ElementoListaQuizAllenamentoGiornaliero
              key={index}
              index={index + 1}
              quizAllenamentoGiornaliero={quizAllenamento}
              onQuizAllenamentoGiornalieroClick={handleQuizAllenamentoClick}
            />
          ))
        )}
      </List>
    </div>
  );

  const [punteggio_totale, setPunteggio_totale] = useState(0);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (userType !== null || loading) {
    return (
      <div>
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
                Quiz Allenamento Giornaliero
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="quizAllenamento"
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
                '&.MuiDrawer-paper': {
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
                '&.MuiDrawer-paper': {
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
            id="quizAllenamento"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: '100% ', md: `calc(100%- ${drawerWidth}em)` },
            }}
          >
            <Toolbar />
            {selectedQuizAllenamento ? (
              <>
                <Typography variant="h4">
                  Punteggio totale:&nbsp;{' '}
                  {selectedQuizAllenamento.quizAllenamento.punteggio_totale ??
                    '0'}
                </Typography>

                <Typography variant="h6">
                  {'Numero domande: ' +
                    `${selectedQuizAllenamento.quizAllenamento.numero_domande}`}
                </Typography>
                {Object.values(selectedQuizAllenamento.domandeRisposte).map(
                  (domandaRisposta, index) => (
                    <Card key={index} sx={{ margin: '2em' }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          style={{
                            color:
                              domandaRisposta.corretta === true
                                ? 'forestgreen'
                                : 'crimson',
                          }}
                        >
                          Domanda: {domandaRisposta.domanda}
                        </Typography>
                        <Typography variant="h6">Risposte:</Typography>
                        <br />
                        {domandaRisposta.risposte.map((risposta, ind) => (
                          <div key={ind}>
                            <Typography
                              variant="h6"
                              style={{
                                color: colore(
                                  risposta.corretta,
                                  risposta.selezionata
                                ),
                              }}
                            >
                              {risposta.risposta}
                            </Typography>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )
                )}
              </>
            ) : (
              <Typography paragraph>Seleziona un quiz allenamento.</Typography>
            )}
          </Box>
        </Box>
      </div>
    );
  } else {
    return <AccessoNegato />;
  }
}

export default ListaQuizAllenamentoMedico;
