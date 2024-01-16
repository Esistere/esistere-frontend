import React from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import DiversityIcon from '@mui/icons-material/Diversity1';

const Footer: React.FC = () => {
  const styles = {
    footerContainer: {
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: '#8A2BE2',
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    },
    typography: {
      sx: 2,
      color: 'white',
    },
    iconButton: {
      color: 'white',
    },
    link: {
      color: 'white',
      textDecoration: 'underline',
    },
  };

  return (
    <Box component="footer" sx={styles.footerContainer}>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Stack alignItems="center" spacing={2}>
              <DiversityIcon sx={styles.iconButton} />
              <Link
                href="https://github.com/Esistere"
                underline="none"
                sx={styles.link}
              >
                Esistere
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={1}>
          <IconButton
            aria-label="Facebook"
            component="a"
            href="https://www.facebook.com"
            sx={styles.iconButton}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            component="a"
            href="https://www.twitter.com"
            sx={styles.iconButton}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            aria-label="Instagram"
            component="a"
            href="https://www.instagram.com"
            sx={styles.iconButton}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            aria-label="GitHub"
            component="a"
            href="https://www.github.com"
            sx={styles.iconButton}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={styles.typography}
        >
          © 2024 Esistere. Tutti i diritti riservati.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
