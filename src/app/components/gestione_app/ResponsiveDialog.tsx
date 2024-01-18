import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Pulsante from './Pulsante';
import { useEffect } from 'react';

interface ResponsiveDialogProps {
  onClose: () => void;
}

function ResponsiveDialog(props: ResponsiveDialogProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (): void => {
    setOpen(false);
    props.onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText
            style={{ fontSize: '1.5em', textAlign: 'center', margin: 'auto' }}
          >
            Riempi prima tutti i tuoi dati
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Pulsante
            onClick={handleClose}
            tipologia="scuro"
            testo="Ok"
            nome="ok"
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ResponsiveDialog;
