import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Filastrocca } from 'app/interfaces/gestione_filastrocche/Filastrocca'; //
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Caricamento from '../gestione_app/Caricamento';
import { useUser } from '../gestione_autenticazione/UserProvider';
import AccessoNegato from '../gestione_autenticazione/AccessoNegato';
import FilastroccaControl from 'app/control/gestione_filastrocca/FilastroccaControl';
import 'app/css/gestione_app/FormElements.css';
import ElementoListaFilastrocca from './ElementoListaFilastrocca';

const drawerWidth = 338; //240 provare

interface Props {
  window?: () => Window;
}

function ListaFilastrocche(props: Props): JSX.Element {
  const [filastrocche, setFilastrocche] = useState<Filastrocca[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilastrocca, setSelecteFilastrocca] =
    useState<Filastrocca | null>(null);
  const { userType, loading } = useUser();

  const fetchData = async (): Promise<void> => {
    const filastroccaControl = new FilastroccaControl();

    try {
      const data = await filastroccaControl.fetchFilastrocche(
        Number(localStorage.getItem('id'))
      );
      setFilastrocche(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching filastrocche:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilastroccaClick = (filastrocca: Filastrocca): void => {
    setSelecteFilastrocca(filastrocca);
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
        ) : filastrocche.length === 0 ? (
          <p>Non ci sono filastrocche.</p>
        ) : (
          filastrocche.map((filastrocca, index) => (
            <ElementoListaFilastrocca
              key={index}
              filastrocca={filastrocca}
              onFilastroccaClick={handleFilastroccaClick}
            />
          ))
        )}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  if (userType === 1 || loading) {
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
                Filastrocche
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="filastrocche"
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
            id="filastrocche"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: '100% ', md: `calc(100%- ${drawerWidth}em)` },
            }}
          >
            <Toolbar />
            {selectedFilastrocca ? (
              <>
                <Typography variant="h4">
                  {selectedFilastrocca.titolo}
                </Typography>
                <Typography variant="h6">
                  {selectedFilastrocca.testo}
                </Typography>
                <Typography variant="h6">
                  {selectedFilastrocca.autore}
                </Typography>
              </>
            ) : (
              <Typography paragraph>Seleziona una filastrocca.</Typography>
            )}
          </Box>
        </Box>
      </div>
    );
  } else {
    return <AccessoNegato />;
  }
}

export default ListaFilastrocche;
