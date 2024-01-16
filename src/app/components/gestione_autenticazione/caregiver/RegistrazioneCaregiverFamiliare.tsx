import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { MedicoPerAutocomplete } from 'app/interfaces/gestione_autenticazione/utils/MedicoPerAutocomplete';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Caricamento from 'app/components/gestione_app/Caricamento';
import { emailRegex, passwordRegex } from '../Regex';
import { theme } from 'app/components/gestione_app/FormTheme';
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

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailError, setEmailError] = useState('');
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value;

    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      email: newEmail,
    }));

    const isValid = emailRegex.test(newEmail) || newEmail === '';
    setIsEmailValid(isValid);

    if (!isValid) {
      setEmailError('Inserisci un indirizzo email valido.');
    } else {
      setEmailError('');
    }
  };

  const [isPassValid, setIsPassValid] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState('');
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPass = event.target.value;

    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      passwd: newPass,
    }));

    const isValid = passwordRegex.test(newPass) || newPass === '';
    setIsPassValid(isValid);

    if (!isValid) {
      setPasswordError('Inserisci una password valida.');
    } else {
      setPasswordError('');
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

  const handleChangeCaregiverFamiliare = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormDataCaregiverFamiliare({
      ...formDataCaregiverFamiliare,
      [name]: value,
    });
  };

  const handleChangePaziente = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  // Handling date focus
  const [focusCgFam, setFocusedCgFam] = useState(false);
  const [hasValueCgFam, setHasValueCgFam] = useState(false);
  const onFocusCgFam = (): void => setFocusedCgFam(true);
  const onBlurCgFam = (): void => setFocusedCgFam(false);

  const [focusPaziente, setFocusedPaziente] = useState(false);
  const [hasValuePaziente, setHasValuePaziente] = useState(false);
  const onFocusPaziente = (): void => setFocusedPaziente(true);
  const onBlurPaziente = (): void => setFocusedPaziente(false);

  return (
    <>
      {/* caregiver */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Card
            sx={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              padding: (theme) => theme.spacing(3),
              bgcolor: '#fefefe',
              boxShadow: '0 3px 5px 2px rgba(155, 105, 135, .3)',
              color: '#5E35B1',
            }}
          >
            <CardContent
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                id="cg-title"
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                Diventa uno dei nostri Caregiver!
              </Typography>
              <form
                className="formflex"
                style={{ display: visibility.visibilityCG }}
              >
                <div className="riga">
                  <TextField
                    type="text"
                    name="nome"
                    id="outlined-nome-input"
                    label="Nome"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    onChange={handleChangeCaregiverFamiliare}
                    required
                  />
                  <TextField
                    type="text"
                    name="cognome"
                    id="outlined-cognome-input"
                    label="Cognome"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      backgroundColor: '#F6EFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
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
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      backgroundColor: '#F6EFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    required
                    onChange={handleChangeCaregiverFamiliare}
                  />
                  <TextField
                    type="text"
                    name="numero_civico"
                    id="outlined-num-civico-input"
                    label="Numero Civico"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      backgroundColor: '#F6EFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
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
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      backgroundColor: '#F6EFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    required
                    onChange={handleChangeCaregiverFamiliare}
                  />
                  <TextField
                    name="data_di_nascita"
                    id="outlined-birthdate-input"
                    label="Data di nascita"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      backgroundColor: '#F6EFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    required
                    onFocus={onFocusCgFam}
                    onBlur={onBlurCgFam}
                    type={hasValueCgFam || focusCgFam ? 'date' : 'text'}
                    onChange={(e) => {
                      if (e.target.value) setHasValueCgFam(true);
                      else setHasValueCgFam(false);
                      handleChangeCaregiverFamiliare(e);
                    }}
                  />
                </div>
                <div className="riga">
                  <TextField
                    type="text"
                    name="numero_telefono"
                    id="outlined-num-telefono-input"
                    label="Numero Telefono"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      backgroundColor: '#F6EFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                    type="email"
                    name="email"
                    id="outlined-email-input"
                    value={formDataCaregiverFamiliare.email}
                    label="Email"
                    error={
                      !isEmailValid &&
                      formDataCaregiverFamiliare.email.length > 0
                    }
                    style={{
                      flexBasis: 'calc(26 em)',
                      margin: '1em',
                      boxSizing: 'border-box',
                      marginLeft: '20%',
                      marginRight: '20%',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <div
                      style={{
                        color: 'red',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {emailError}
                    </div>
                  )}
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
                    value={formDataCaregiverFamiliare.passwd}
                    label="Password"
                    error={
                      !isPassValid &&
                      formDataCaregiverFamiliare.passwd.length > 0
                    }
                    style={{
                      flexBasis: '26em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <div
                      style={{
                        color: 'red',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {passwordError}
                    </div>
                  )}
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
                      height: '100%',
                      marginTop: '1.5em',
                    }}
                    variant="contained"
                    onMouseEnter={() => gestisciHover(true)}
                    onMouseLeave={() => gestisciHover(false)}
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
                {/* paziente */}
                <Typography
                  className="testo"
                  component="h1"
                  variant="h5"
                  color="#8A2BE2"
                  id="cg-title"
                  sx={{ mt: -3, mb: 3, fontWeight: 'bold' }}
                >
                  Inserisci i dati del tuo paziente!
                </Typography>
                <div className="riga">
                  <TextField
                    required
                    type="text"
                    label="Codice Fiscale"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    name="codice_fiscale"
                    inputProps={{style: {textTransform: 'uppercase'}}}
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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    name="cognome"
                    onChange={handleChangePaziente}
                  />
                  <TextField
                    name="data_di_nascita"
                    id="outlined-birthdate-input"
                    label="Data di nascita"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      backgroundColor: '#F6EFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    required
                    onFocus={onFocusPaziente}
                    onBlur={onBlurPaziente}
                    type={hasValuePaziente || focusPaziente ? 'date' : 'text'}
                    onChange={(e) => {
                      if (e.target.value) setHasValuePaziente(true);
                      else setHasValuePaziente(false);
                      handleChangePaziente(e);
                    }}
                  />
                  {/* <TextField
                    required
                    type="date"
                    name="data_di_nascita"
                    id="outlined-birthdate-input"
                    style={{
                      width: '16.15em',
                      margin: '1em',
                      boxSizing: 'border-box',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    onChange={handleChangePaziente}
                  /> */}
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
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
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
