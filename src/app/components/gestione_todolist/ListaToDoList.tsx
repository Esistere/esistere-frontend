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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react';

import 'app/css/gestione_app/FormElements.css';
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import ToDoListControl from 'app/control/gestione_todolist/ToDoListControl';
import ElementoDatiToDoList from './ElementoDatiToDoList';
import ElementoToDoList from './ElementoToDoList';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 338;

interface Props {
  window?: () => Window;
}

function ListaToDoList(props: Props): JSX.Element {
  const [toDoList, setToDoList] = useState<ToDoList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedToDoList, setSelectedToDoList] = useState<ToDoList | null>(
    null
  );
  const location = useLocation();
  const cf = location.state;
  console.log(cf);

  const navigate = useNavigate();
  const handleGoBack = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const toDoListControl = new ToDoListControl();

      try {
        if (cf) {
          console.log(cf);
          const data = await toDoListControl.fetchToDoListByPaziente(cf);
          setToDoList(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching pazienti:', error);
      }
    };

    fetchData();
  }, [cf]);

  const handleToDoListClick = (toDoList: ToDoList): void => {
    setSelectedToDoList(toDoList);
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
          ) : toDoList.length === 0 ? (
            <p>Non ci sono ToDoList.</p>
          ) : (
            toDoList.map((toDoListItem, index) => (
              <div
                key={index}
                onClick={() => handleToDoListClick(toDoListItem)}
              >
                <ElementoToDoList
                  key={index}
                  index={index}
                  selectedToDoList={toDoListItem}
                />
                {index < toDoList.length - 1 && <Divider />}
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
    <div>
      <Navbar />
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
              ToDoList
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
          {selectedToDoList ? (
            <ElementoDatiToDoList {...selectedToDoList} />
          ) : (
            <Typography paragraph>Seleziona una ToDoList.</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default ListaToDoList;
