import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HOME } from 'app/config';
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
import MasksIcon from '@mui/icons-material/Masks';
import CloseIcon from '@mui/icons-material/Close';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar(): JSX.Element {
  const [, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <AppBar
      position="sticky"
      sx={{ top: 0, zIndex: 1201, backgroundColor: 'blueviolet' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MasksIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Esistere
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
                to={`/${HOME}`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  onClick={handleCloseDrawer}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Home
                </Button>
              </Link>
              <Link
                to={`/${HOME}/login`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  onClick={handleCloseDrawer}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Login
                </Button>
              </Link>
              <Link
                to={`/${HOME}/registrazione`}
                style={{
                  textDecoration: 'none',
                }}
              >
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
              </Link>
              <Link
                to={`/${HOME}/lista`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  onClick={handleCloseDrawer}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Lista Pazienti
                </Button>
              </Link>
              <Link
                to={`/${HOME}`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  onClick={handleCloseDrawer}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Logout
                </Button>
              </Link>
            </Drawer>
          </Box>
          <MasksIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            Esistere
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link
              to={`/${HOME}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                onClick={handleCloseDrawer}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
            </Link>
            <Link
              to={`/${HOME}/login`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                onClick={handleCloseDrawer}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            </Link>
            <Link
              to={`/${HOME}/registrazione`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                onClick={handleCloseDrawer}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Registrazione
              </Button>
            </Link>
            <Link
              to={`/${HOME}/lista`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                onClick={handleCloseDrawer}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Lista Pazienti
              </Button>
            </Link>
            <Link
              to={`/${HOME}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                onClick={handleCloseDrawer}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logout
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
