import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserType, useUser } from './gestione_autenticazione/UserProvider';
import logonavbar from 'app/assets/logonavbar.png';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';

function Navbar(): JSX.Element {
  const handleGoBack = (): void => {
    window.history.back();
  };
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const { userType, loading } = useUser();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const handleOpenDrawer = (): void => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = (): void => {
    setDrawerOpen(false);
  };
  const [codice, setCodice] = useState<string | undefined>(undefined);
  const fetchCodice = async (): Promise<void> => {
    if (userType === UserType.caregiver) {
      const pazienteControl = new PazienteControl();
      try {
        const data = await pazienteControl.fetchCodicePaziente(
          Number(localStorage.getItem('id'))
        );
        setCodice(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching dati caregiver familiare:', error);
      }
    }
  };
  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 600) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    fetchCodice();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* eslint-disable */
  const homeValue =
    '#/' +
    (userType === UserType.medico
      ? 'medico'
      : userType === UserType.caregiver
      ? 'caregiver'
      : '');
  /* eslint-enable */

  const naviga = (): void => {
    navigate('/caregiver/visualizza_todolist', {
      state: codice,
    });
  };
  return (
    <div>
      <AppBar
        position="fixed"
        id="appBar"
        sx={{ top: 0, zIndex: 1201, backgroundColor: 'blueviolet' }}
      >
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              height: '3.5em',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={homeValue}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={logonavbar} style={{ height: '2em' }} alt="Esistere" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={isDrawerOpen ? handleCloseDrawer : handleOpenDrawer}
                color="inherit"
              >
                {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                variant="temporary"
                sx={{
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: 240,
                    zIndex: 1190,
                  },
                }}
              >
                <Button
                  onClick={handleCloseDrawer}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {' '}
                </Button>
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {!loading && userType === null && (
                    <Button
                      disabled
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Home
                    </Button>
                  )}
                </Link>
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {!loading && userType === null && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Home
                    </Button>
                  )}
                </Link>
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {!loading && userType === null && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Login
                    </Button>
                  )}
                </Link>
                <Link
                  to="/registrazione"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {!loading && userType === null && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{
                        my: 2,
                        color: 'black',
                        display: 'block',
                      }}
                    >
                      Registrazione
                    </Button>
                  )}
                </Link>
                <Link
                  to="/medico/lista"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.medico && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Lista Pazienti
                    </Button>
                  )}
                </Link>

                <Link
                  to="/caregiver/crea_storia"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.caregiver && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Crea Storia
                    </Button>
                  )}
                </Link>
                <Link
                  to="/caregiver/quiz_allenamento"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.caregiver && (
                    <Button
                      id="button-quiz-allenamento"
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Quiz Allenamento
                    </Button>
                  )}
                </Link>
                <Link
                  to="/medico/lineeguidaform"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.medico && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      linee guida
                    </Button>
                  )}
                </Link>
                <Link
                  to="/caregiver/filastrocca"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.caregiver && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Filastrocca
                    </Button>
                  )}
                </Link>
                {userType === UserType.caregiver && (
                  <Button
                    sx={{ my: 2, color: 'black', display: 'block' }}
                    onClick={() => {
                      handleCloseDrawer();
                      naviga();
                    }}
                  >
                    ToDoList
                  </Button>
                )}
              </Drawer>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={logonavbar} style={{ height: '2em' }} alt="Esistere" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                }}
              >
                {!loading && userType === null && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Login
                  </Button>
                )}
              </Link>
              <Link
                to="/registrazione"
                style={{
                  textDecoration: 'none',
                }}
              >
                {!loading && userType === null && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Registrazione
                  </Button>
                )}
              </Link>
              <Link
                to="/medico/lista"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.medico && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Lista Pazienti
                  </Button>
                )}
              </Link>

              <Link
                to="/caregiver/crea_storia"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.caregiver && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Crea Storia
                  </Button>
                )}
              </Link>
              <Link
                to="/caregiver/quiz_allenamento"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.caregiver && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Quiz Allenamento
                  </Button>
                )}
              </Link>
              <Link
                to="/caregiver/filastrocca"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.caregiver && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Filastrocca
                  </Button>
                )}
              </Link>
              <Link
                to="/medico/lineeguidaform"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.medico && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    linee guida
                  </Button>
                )}
              </Link>
              {userType === UserType.caregiver && (
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={() => {
                    handleCloseDrawer();
                    naviga();
                  }}
                >
                  ToDoList
                </Button>
              )}
            </Box>
            {userType != null && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="Area personale" onClick={handleCloseUserMenu}>
                    {userType === UserType.caregiver ? (
                      <Link
                        to="/caregiver/area_personale"
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <Typography
                          textAlign="center"
                          style={{ color: 'black' }}
                        >
                          Area Personale
                        </Typography>
                      </Link>
                    ) : (
                      <Link
                        to="/medico/area_personale"
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <Typography
                          textAlign="center"
                          style={{ color: 'black' }}
                        >
                          Area Personale
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem
                    key="Logout"
                    onClick={() => {
                      handleCloseUserMenu();
                      localStorage.removeItem('jwt');
                      localStorage.removeItem('id');
                      navigate('/');
                      window.location.reload();
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      <Typography textAlign="center" style={{ color: 'black' }}>
                        Logout
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{ height: '3.5em' }}></div>
      {path !== '/' && path !== '/caregiver' && path !== '/medico' && (
        <ArrowBackIcon
          onClick={handleGoBack}
          style={{
            color: 'blueviolet',
            position: 'fixed',
            zIndex: 1100,
            bottom: '1.5em',
            left: '1.5em',
            height: '2.5em',
            width: '2.5em',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
}
export default Navbar;
