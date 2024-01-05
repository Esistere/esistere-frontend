import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Caricamento from './Caricamento';
import ElementoLista from './ElementoLista';
import { Divider } from '@mui/material';
import { useUser } from './UserProvider';
import AccessoNegato from './AccessoNegato';

import SignalCellularAltIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';

const drawerWidth = 338;

interface Props {
  window?: () => Window;
}

function ListaPazienti(props: Props): JSX.Element {
  const [pazienti, setPazienti] = useState<Paziente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaziente, setSelectedPaziente] = useState<Paziente | null>(
    null
  );
  const { userType, loading } = useUser();

  const fetchData = async (): Promise<void> => {
    const pazienteControl = new PazienteControl();

    try {
      const data = await pazienteControl.fetchPazienti(
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
  if (userType === 0 || loading) {
    return (
      <div>
        <Navbar />
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}em)` },
              //ml: { sm: `${drawerWidth}em` },
              //position: { xs: 'relative', md: 'sticky' },
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
              // width: { sm: `calc(100% - ${drawerWidth}em)` },
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

                <div>
                  <Button
                    style={{
                      background: '#ffffff',
                      color: '#8036a1',
                      borderColor: '#000000',
                    }}
                    variant="outlined"
                    //onMouseEnter={() => gestisciHover(true)}
                    //onMouseLeave={() => gestisciHover(false)}
                    endIcon={<SignalCellularAltIcon />}
                  >
                    Andamento
                  </Button>
                </div>
              </div>
            ) : (
              <Typography paragraph>
                Seleziona un paziente per visualizzare i dati.
              </Typography>
            )}
          </Box>
        </Box>
      </div>
    );
  } else {
    return <AccessoNegato />;
  }
}

export default ListaPazienti;
