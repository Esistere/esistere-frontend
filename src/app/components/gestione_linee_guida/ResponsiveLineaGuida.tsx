import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Pulsante from '../gestione_app/Pulsante';
import { useEffect } from 'react';
import LineaGuidaControl from 'app/control/gestione_autenticazione/LineaGuidaControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import { LineaGuida } from 'app/interfaces/gestione_autenticazione/LineaGuida';

interface ResponsiveDialogProps {
  onClose: () => void;
}

function ResponsiveLineaGuida(props: ResponsiveDialogProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [lineaGuida, setLineaGuida] = React.useState<LineaGuida>({
    id: 0,
    linea_guida: '',
    med: 0,
  });

  const fetchLineaGuida = async (): Promise<void> => {
    const pazienteControl: PazienteControl = new PazienteControl();
    try {
      const cf = await pazienteControl.fetchCodicePaziente(
        Number(localStorage.getItem('id'))
      );
      console.log(cf);
      const medico = await pazienteControl.visualizzaMedByPaziente({
        codice_fiscale: cf,
      });
      console.log(medico);
      const lineaGuidaControl = new LineaGuidaControl();
      const risultato = await lineaGuidaControl.fetchLineaGuidaByMed(medico);
      setLineaGuida(risultato);
    } catch (e) {
      console.error('Errore durante il recupero delle linee guida', e);
    } finally {
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchLineaGuida();
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
        aria-labelledby="responsive-linea-guida-title"
      >
        <DialogContent>
          <DialogContentText
            style={{ fontSize: '1.5em', textAlign: 'center', margin: 'auto' }}
          >
            {lineaGuida.linea_guida}
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

export default ResponsiveLineaGuida;
