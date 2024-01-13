import React, { useEffect } from 'react';
import { useState } from 'react';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import {
  Alert,
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from '@mui/material';
import {
  ArrowForwardIos,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { MedicoPerAutocomplete } from 'app/interfaces/gestione_autenticazione/utils/MedicoPerAutocomplete';
import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import Caricamento from './Caricamento';

interface caricaMediciResult {
  fetchMediciData: () => Promise<void>;
}

let opzioni: MedicoPerAutocomplete[] = [
  {
    name: 'MedicoEsempio',
    value: '0',
  },
];

let selectedMedico: {
  name: string;
  value: string;
} | null;
let deveCaricare = true;
let success: boolean | null = null;
let status: string | null = null;
let open = false;
function RegistrazioneCaregiverFamiliare(): JSX.Element {
  const [visibility, setVisibility] = useState({
    visibilityCG: 'block',
    visibilityPAZ: 'none',
  });
  const [formDataCaregiverFamiliare, setFormDataCaregiverFamiliare] = useState({
    nome: '',
    cognome: '',
    indirizzo: '',
    citta: '',
    numero_civico: '',
    data_di_nascita: '',
    numero_telefono: '',
    email: '',
    passwd: '',
  });
  const [formDataPaziente, setFormDataPaziente] = useState({
    codice_fiscale: '',
    nome: '',
    cognome: '',
    data_di_nascita: '',
    med: '',
    cg_fam: '',
  });
  let isLoading = false;

  const handleChangeCaregiverFamiliare = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormDataCaregiverFamiliare({
      ...formDataCaregiverFamiliare,
      [name]: value,
    });
  };

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPassValid, setIsPassValid] = useState<boolean>(true);

  useEffect(() => {
    // Effetto per controllare l'email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/;
    setIsEmailValid(emailRegex.test(formDataCaregiverFamiliare.email));
  }, [formDataCaregiverFamiliare.email]);

  useEffect(() => {
    // Effetto per controllare la password
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    setIsPassValid(passRegex.test(formDataCaregiverFamiliare.passwd));
  }, [formDataCaregiverFamiliare.passwd]);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  let mediciData: Medico[];
  const caricaMedici = (): caricaMediciResult => {
    const fetchMediciData = async (): Promise<void> => {
      isLoading = true;
      const medicoControl = new MedicoControl();
      mediciData = await medicoControl.fetchMedici();
      if (mediciData.length > 0) {
        isLoading = false;
        setVisibility({
          visibilityCG: 'block',
          visibilityPAZ: 'block',
        });
        console.log(mediciData);
        opzioni = mediciData.map((medico) => ({
          name: `${medico.nome} ${medico.cognome}`,
          value: medico.codice_identificativo?.toString() || '',
        }));
      }
    };
    return { fetchMediciData };
  };

  const [avvia, setAvvia] = useState(false);

  useEffect((): void => {
    if (avvia) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isLoading = true;
    }
  }, [avvia]);

  const { fetchMediciData } = caricaMedici();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (avvia) {
        try {
          await fetchMediciData();
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          isLoading = false;
        }
      }
    };

    fetchData();
  }, [avvia, fetchMediciData]);

  const handleInserisciPaziente = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    const requiredFieldsFilled = Object.values(
      formDataCaregiverFamiliare
    ).every((value) => value !== '');

    if (requiredFieldsFilled && isEmailValid && isPassValid) {
      setAvvia(true);
    } else {
      console.log('Please fill in all required fields.');
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const caregiverFamiliare: CaregiverFamiliare = {
      ...formDataCaregiverFamiliare,
      data_di_nascita: new Date(formDataCaregiverFamiliare.data_di_nascita),
    };

    const caregiverFamiliareControl: CaregiverFamiliareControl =
      new CaregiverFamiliareControl();

    const codice_identificativo =
      await caregiverFamiliareControl.inviaDatiCaregiverFamiliare(
        caregiverFamiliare
      );

    const paziente: Paziente = {
      ...formDataPaziente,
      data_di_nascita: new Date(formDataPaziente.data_di_nascita),
      med: Number(formDataPaziente.med),
      cg_fam: codice_identificativo,
    };

    const pazienteControl: PazienteControl = new PazienteControl();
    pazienteControl
      .inviaDatiPaziente(paziente)
      .then(() => {
        success = true;
        open = true;
      })
      .catch((value) => {
        success = false;
        open = true;
        status = value;
      });
  };

  const handleChangePaziente = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormDataPaziente({
      ...formDataPaziente,
      [name]: value,
    });
  };

  const handleChangeMedico = (
    event: React.SyntheticEvent,
    newValue: { name: string; value: string } | null
  ): void => {
    console.log(JSON.stringify(newValue));
    if (newValue) {
      deveCaricare = true;
      setFormDataPaziente((prevFormData) => ({
        ...prevFormData,
        med: newValue.value,
      }));
      selectedMedico = newValue;
      console.log(selectedMedico);
    }
  };

  useEffect((): void => {
    if (
      selectedMedico !== null &&
      selectedMedico !== undefined &&
      deveCaricare !== false
    ) {
      const selMed: MedicoPerAutocomplete = selectedMedico;
      setFormDataPaziente((prevFormData) => ({
        ...prevFormData,
        med: selMed.value ?? '0',
      }));
      deveCaricare = false;
      console.log(selectedMedico.value, formDataPaziente, selMed.value);
    }
  }, [formDataPaziente]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    open = false;
  };

  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  return (
    <>
      <form className="formflex" style={{ display: visibility.visibilityCG }}>
        <div className="riga">
          <h2 className="testo">Diventa uno dei nostri Caregiver!</h2>
        </div>
        <div className="riga">
          <TextField
            type="text"
            name="nome"
            id="outlined-nome-input"
            required
            label="Nome"
            style={{ width: '16.15em', margin: '1em', boxSizing: 'border-box' }}
            onChange={handleChangeCaregiverFamiliare}
          />
          <TextField
            type="text"
            name="cognome"
            id="outlined-cognome-input"
            label="Cognome"
            style={{ width: '16.15em', margin: '1em', boxSizing: 'border-box' }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
        </div>
        <div className="riga">
          <TextField
            type="text"
            name="indirizzo"
            id="outlined-indirizzo-input"
            label="Indirizzo"
            style={{ width: '16.15em', margin: '1em', boxSizing: 'border-box' }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
          <TextField
            type="text"
            name="numero_civico"
            id="outlined-num-civico-input"
            label="Numero Civico"
            style={{ width: '16.15em', margin: '1em', boxSizing: 'border-box' }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
        </div>
        <div className="riga">
          <TextField
            type="text"
            name="citta"
            id="outlined-citta-input"
            label="Città"
            style={{ width: '16.15em', margin: '1em', boxSizing: 'border-box' }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
          <TextField
            type="date"
            name="data_di_nascita"
            id="outlined-birthdate-input"
            label="Data di Nascita"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
        </div>
        <div className="riga">
          <TextField
            type="text"
            name="numero_telefono"
            id="outlined-num-telefono-input"
            label="Numero Telefono"
            style={{ width: '16.15em', margin: '1em', boxSizing: 'border-box' }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
        </div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <TextField
            type="email"
            name="email"
            id="outlined-email-input"
            label="Email"
            style={{
              flexBasis: 'calc(26 em)',
              margin: '1em',
              boxSizing: 'border-box',
              marginLeft: '20%',
              marginRight: '20%',
              backgroundColor: isEmailValid ? 'white' : 'lightcoral',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" disabled>
                    <Visibility style={{ opacity: '0' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
        </div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <TextField
            type={showPassword ? 'text' : 'password'}
            name="passwd"
            id="outlined-password-input"
            label="Password"
            style={{
              flexBasis: '26em',
              margin: '1em',
              boxSizing: 'border-box',
              backgroundColor: isPassValid ? 'white' : 'lightcoral',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
        </div>
        <div className="riga">
          <Button
            style={{
              background: coloreBottone,
              display:
                visibility.visibilityCG === 'block' &&
                visibility.visibilityPAZ === 'block'
                  ? 'none'
                  : 'block',
            }}
            variant="contained"
            onMouseEnter={() => gestisciHover(true)}
            onMouseLeave={() => gestisciHover(false)}
            endIcon={<ArrowForwardIos />}
            onClick={handleInserisciPaziente}
          >
            Inserisci Paziente
          </Button>
        </div>
      </form>
      {isLoading ? <Caricamento /> : <></>}
      <form
        method="post"
        className="formflex"
        style={{ display: visibility.visibilityPAZ }}
        onSubmit={handleSubmit}
      >
        <div className="riga">
          <h2 className="testo">Inserisci i dati del tuo paziente!</h2>
        </div>
        <div className="riga">
          <TextField
            required
            type="text"
            label="Codice Fiscale"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            name="codice_fiscale"
            onChange={handleChangePaziente}
          />
          <TextField
            required
            type="text"
            label="Nome"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            name="nome"
            onChange={handleChangePaziente}
          />
        </div>
        <div className="riga">
          <TextField
            required
            type="text"
            label="Cognome"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            name="cognome"
            onChange={handleChangePaziente}
          />
          <TextField
            required
            type="date"
            name="data_di_nascita"
            id="outlined-birthdate-input"
            label="Data di Nascita"
            placeholder=""
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChangePaziente}
          />
        </div>
        <div className="riga">
          <Autocomplete
            loading
            options={opzioni}
            getOptionLabel={(op) => op.name}
            onChange={handleChangeMedico}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Scegli un medico"
                style={{
                  width: '16.15em',
                  margin: '1em',
                  boxSizing: 'border-box',
                }}
              />
            )}
          />
        </div>
        <div className="riga">
          <Button
            style={{
              background: coloreBottone,
            }}
            type="submit"
            variant="contained"
            onMouseEnter={() => gestisciHover(true)}
            onMouseLeave={() => gestisciHover(false)}
            onClick={() => handleInserisciPaziente}
            endIcon={<CheckIcon />}
          >
            Registrati
          </Button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success
            ? 'Registrazione effettuata con successo!'
            : `Registrazione fallita. Errore : ${status}`}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RegistrazioneCaregiverFamiliare;
