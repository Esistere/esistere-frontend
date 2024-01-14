import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { UserType, useUser } from './gestione_autenticazione/UserProvider';
import logonavbar from 'app/assets/logonavbar.png';

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const { userType, loading } = useUser();
  const [, setAnchorElNav] = React.useState<null | HTMLElement>(null);
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
    setAnchorElNav(null);
  };

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 600) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  return (
    <div style={{ paddingTop: '64px' }}>
      <AppBar
        position="fixed"
        id="appBar"
        sx={{ top: 0, zIndex: 1201, backgroundColor: 'blueviolet' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
              >
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
                  {userType !== null && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Quiz Allenamento
                    </Button>
                  )}
                </Link>
                <Link
                  to="/caregiver/crea_filastrocca"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.caregiver && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Crea filastrocca
                    </Button>
                  )}
                </Link>
                <Link
                  to="/caregiver/visualizza_filastrocche"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.caregiver && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Visualizza filastrocche
                    </Button>
                  )}
                </Link>
                <Link
                  to="/caregiver/crea_todo_list"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {userType === UserType.medico && (
                    <Button
                      onClick={handleCloseDrawer}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      Crea ToDoList
                    </Button>
                  )}
                </Link>
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
                to="/"
                style={{
                  textDecoration: 'none',
                }}
              >
                {!loading && userType === null && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
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
                {userType !== null && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Quiz Allenamento
                  </Button>
                )}
              </Link>
              <Link
                to="/caregiver/crea_filastrocca"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.caregiver && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Crea filastrocca
                  </Button>
                )}
              </Link>
              <Link
                to="/caregiver/visualizza_filastrocche"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.caregiver && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Visualizza filastrocche
                  </Button>
                )}
              </Link>
              <Link
                to="/caregiver/crea_todo_list"
                style={{
                  textDecoration: 'none',
                }}
              >
                {userType === UserType.medico && (
                  <Button
                    onClick={handleCloseDrawer}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Crea ToDoList
                  </Button>
                )}
              </Link>
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
                      handleCloseUserMenu;
                      localStorage.removeItem('jwt');
                      navigate('/');
                      window.location.reload();
                      <Link to="/"></Link>;
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
    </div>
  );
}
export default Navbar;
