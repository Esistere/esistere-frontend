import React, { useEffect, useState } from 'react';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';
import { UserType, useUser } from '../gestione_autenticazione/UserProvider';
import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { ResponseObjectQP } from 'app/interfaces/utils/ResponseObjectQP';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import Caricamento from '../gestione_app/Caricamento';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../Navbar';
import AccessoNegato from '../gestione_autenticazione/AccessoNegato';
import ElementoListaQuizPreliminare from './ElementoListaQuizPreliminare';

const drawerWidth = 338;
interface Props {
  window?: () => Window;
}

function ListaQuizPreliminare(props: Props): JSX.Element {
  const [quizPreliminare, setQuizPreliminare] = useState<QuizPreliminare[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuizPreliminare, setSelectedQuizPreliminare] =
    useState<ResponseObjectQP | null>(null);
  const { userType, loading } = useUser();

  const quizPreliminareControl = new QuizPreliminareControl();

  const fetchData = async (): Promise<void> => {
    try {
      const data = await quizPreliminareControl.fetchQuizPreliminari(
        Number(localStorage.getItem('id'))
      );
      setQuizPreliminare(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quiz preliminari', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuizPreliminareClick = async (
    quizPreliminare: QuizPreliminare
  ): Promise<void> => {
    const quiz = await quizPreliminareControl.visualizzaQuizPreliminare(
      Number(quizPreliminare.id)
    );
    setSelectedQuizPreliminare(quiz);
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
        ) : quizPreliminare.length === 0 ? (
          <p>Non ci sono quiz preliminari.</p>
        ) : (
          quizPreliminare.map((quizPreliminare, index) => (
            <ElementoListaQuizPreliminare
              key={index}
              quizPreliminare={quizPreliminare}
              onQuizPreliminareClick={handleQuizPreliminareClick}
            />
          ))
        )}
      </List>
    </div>
  );
  IconButton;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  if (userType === UserType.caregiver || loading) {
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
                Quiz Preliminare
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="quizPreliminare"
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
            id="quizPreliminare"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: '100% ', md: `calc(100%- ${drawerWidth}em)` },
            }}
          >
            <Toolbar />
            {selectedQuizPreliminare ? (
              <>
                <Typography variant="h4">
                  {'Punteggio totale:' +
                    // eslint-disable-next-line max-len
                    `${selectedQuizPreliminare.quizPreliminare.punteggio_totale}`}
                </Typography>
                <Typography variant="h6">
                  {'Numero domande:' +
                    `${selectedQuizPreliminare.quizPreliminare.numero_domande}`}
                </Typography>
                {
                  //TO DO: mettere domande e risposte
                }
              </>
            ) : (
              <Typography paragraph>Seleziona un quiz preliminare.</Typography>
            )}
          </Box>
        </Box>
      </div>
    );
  } else {
    return <AccessoNegato />;
  }
}
export default ListaQuizPreliminare;
