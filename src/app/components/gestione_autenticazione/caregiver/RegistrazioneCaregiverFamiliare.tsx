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
import {
  codiceFiscaleRegex,
  dataNascitaregex,
  emailRegex,
  indirizzoRegex,
  numCivicoRegex,
  numeroTelefonoRegex,
  passwordRegex,
} from 'app/regex';
import { theme } from 'app/components/gestione_app/FormTheme';
import ResponsiveDialog from 'app/components/gestione_app/ResponsiveDialog';
import { useNavigate } from 'react-router-dom';
interface caricaMediciResult {
  fetchMediciData: () => Promise<void>;
}

let opzioni: MedicoPerAutocomplete[] = [
  {
    name: 'Ricaricare la pagina',
    value: '0',
  },
];

let selectedMedico: {
  name: string;
  value: string;
} | null;
let deveCaricare = true;
let success: boolean | null = null;
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
    numero_di_telefono: '',
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

  const [show, setShow] = React.useState(false);

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
          value: medico.codice_identificativo?.toString() ?? '',
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
          setAvvia(false);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          isLoading = false;
        }
      }
    };

    fetchData();
  }, [avvia, fetchMediciData]);

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

  const [confermaPasswd, setConfermaPasswd] = useState<string>('');
  const [isConfermaPassValid, setIsConfermaPassValid] = useState<boolean>(true);
  const [confermaPasswordError, setConfermaPasswordError] = useState('');
  const handleConfermaPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const newPass = event.target.value;

    setConfermaPasswd(newPass);
    console.log(newPass === formDataCaregiverFamiliare.passwd);
    if (newPass === formDataCaregiverFamiliare.passwd) {
      const isValid = passwordRegex.test(newPass) || newPass === '';
      console.log(isValid);
      setIsConfermaPassValid(isValid);
      console.log(isConfermaPassValid);
    } else {
      setIsConfermaPassValid(false);
      setConfermaPasswordError('Le password non corrispondono.');
    }
    console.log(isConfermaPassValid);
    if (!isConfermaPassValid) {
      setConfermaPasswordError('Le password non corrispondono.');
    } else {
      setConfermaPasswordError('');
    }
  };

  const [isAndressValid, setIsAndressValid] = useState<boolean>(true);
  const [andressError, setAndressError] = useState('');
  const handleAndressChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newAndress = event.target.value;
    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      indirizzo: newAndress,
    }));

    const isValid = indirizzoRegex.test(newAndress) || newAndress === '';
    setIsAndressValid(isValid);
    if (!isValid) {
      setAndressError('Inserisci un indirizzo valido.');
    } else {
      setAndressError('');
    }
  };

  const [isNumCivValid, setIsNumCivValid] = useState<boolean>(true);
  const [numCivError, setNumCivError] = useState('');
  const handleNumCivChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newNum = event.target.value;
    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      numero_civico: newNum,
    }));

    const isValid =
      newNum.length < 6 ? numCivicoRegex.test(newNum) || newNum === '' : false;
    setIsNumCivValid(isValid);
    if (!isValid) {
      setNumCivError('Inserisci un numero civico valido. Es. 34523 o 123/A');
    } else {
      setNumCivError('');
    }
  };

  const [isBirthDateValid, setIsBirthDateValid] = useState<boolean>(true);
  const [birthDateError, setBirthDateError] = useState('');
  const handleBirthDateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newData = event.target.value;
    setFormDataCaregiverFamiliare({
      ...formDataCaregiverFamiliare,
      data_di_nascita: newData.split('T')[0],
    });

    const inputDate = new Date(newData);
    const currentDate = new Date();
    console.log(inputDate, currentDate, inputDate <= currentDate);

    const isValid =
      (dataNascitaregex.test(convertDate(newData)) &&
        inputDate <= currentDate) ||
      newData === '';

    setIsBirthDateValid(isValid);

    if (!isValid) {
      setBirthDateError('Inserisci una data di nascita valida.');
    } else {
      setBirthDateError('');
    }
  };

  const [isNumberValid, setIsNumberValid] = useState<boolean>(true);
  const [numberError, setNumberError] = useState('');
  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newNumber = event.target.value;
    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      numero_di_telefono: newNumber,
    }));

    const isValid =
      (numeroTelefonoRegex.test(newNumber) && newNumber.length === 10) ||
      newNumber === '';
    setIsNumberValid(isValid);
    if (!isValid) {
      setNumberError('Inserisci un numero di telefono valido.');
    } else {
      setNumberError('');
    }
  };

  const [isNomeValid, setIsNomeValid] = useState<boolean>(true);
  const [nomeError, setNomeError] = useState('');
  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newNome = event.target.value;
    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      nome: newNome,
    }));

    const isValid = newNome.length < 30 || newNome === '';
    setIsNomeValid(isValid);
    if (!isValid) {
      setNomeError('Inserisci un nome valido.');
    } else {
      setNomeError('');
    }
  };

  const [isCognomeValid, setIsCognomeValid] = useState<boolean>(true);
  const [cognomeError, setCognomeError] = useState('');
  const handleCognomeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newCognome = event.target.value;
    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      cognome: newCognome,
    }));

    const isValid = newCognome.length < 30 || newCognome === '';
    setIsCognomeValid(isValid);
    if (!isValid) {
      setCognomeError('Inserisci un cognome valido.');
    } else {
      setCognomeError('');
    }
  };

  const [isNomePazienteValid, setIsNomePazienteValid] = useState<boolean>(true);
  const [nomePazienteError, setNomePazienteError] = useState('');
  const handleNomePazienteChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const newNomePaziente = event.target.value;
    setFormDataPaziente((prevFormData) => ({
      ...prevFormData,
      nome: newNomePaziente,
    }));

    const isValid = newNomePaziente.length < 30 || newNomePaziente === '';
    setIsNomePazienteValid(isValid);
    if (!isValid) {
      setNomePazienteError('Inserisci un nome valido.');
    } else {
      setNomePazienteError('');
    }
  };

  const [isCognomePazienteValid, setIsCognomePazienteValid] =
    useState<boolean>(true);
  const [cognomePazienteError, setCognomePazienteError] = useState('');
  const handleCognomePazienteChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const newCognomePaziente = event.target.value;
    setFormDataPaziente((prevFormData) => ({
      ...prevFormData,
      cognome: newCognomePaziente,
    }));

    const isValid = newCognomePaziente.length < 30 || newCognomePaziente === '';
    setIsCognomePazienteValid(isValid);
    if (!isValid) {
      setCognomePazienteError('Inserisci un cognome valido.');
    } else {
      setCognomePazienteError('');
    }
  };

  const [isCittaValid, setIsCittaValid] = useState<boolean>(true);
  const [cittaError, setCittaError] = useState('');
  const handleCittaChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newCitta = event.target.value;
    setFormDataCaregiverFamiliare((prevFormData) => ({
      ...prevFormData,
      citta: newCitta,
    }));

    const isValid = newCitta.length < 30 || newCitta === '';
    setIsCittaValid(isValid);
    if (!isValid) {
      setCittaError('Inserisci una città valida.');
    } else {
      setCittaError('');
    }
  };

  const convertDate = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const [isPazienteBirthDateValid, setIsPazienteBirthDateValid] =
    useState<boolean>(true);
  const [pazienteBirthDateError, setPazienteBirthDateError] = useState('');
  const handlePazienteBirthDateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newDataPaziente = event.target.value;
    setFormDataPaziente({
      ...formDataPaziente,
      data_di_nascita: newDataPaziente.split('T')[0],
    });

    const inputDate = new Date(newDataPaziente);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const isValid =
      (dataNascitaregex.test(convertDate(newDataPaziente)) &&
        inputDate <= currentDate) ||
      newDataPaziente === '';
    setIsPazienteBirthDateValid(isValid);

    if (!isValid) {
      setPazienteBirthDateError('Inserisci una data di nascita valida.');
    } else {
      setPazienteBirthDateError('');
    }
  };

  const [isCodeValid, setIsCodeValid] = useState<boolean>(true);
  const [codeError, setCodeError] = useState('');
  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newCode = event.target.value;
    setFormDataPaziente((prevFormData) => ({
      ...prevFormData,
      codice_fiscale: newCode,
    }));

    const isValid = codiceFiscaleRegex.test(newCode) || newCode === '';
    setIsCodeValid(isValid);
    if (!isValid) {
      setCodeError('Inserisci un codice fiscale valido.');
    } else {
      setCodeError('');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insertValidateCgFam = (formDataCaregiverFamiliare: any): boolean => {
    const requiredFieldsFilled = Object.values(
      formDataCaregiverFamiliare
    ).every((value) => value !== '');

    if (
      requiredFieldsFilled &&
      isEmailValid &&
      isPassValid &&
      isConfermaPassValid &&
      isNomeValid &&
      isCognomeValid &&
      isCittaValid &&
      isAndressValid &&
      isNumCivValid &&
      isBirthDateValid &&
      isNumberValid
    )
      return true;
    else return false;
  };

  const handleInserisciPaziente = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    if (insertValidateCgFam(formDataCaregiverFamiliare)) {
      setAvvia(true);
    } else {
      setShow(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insertValidatePaziente = (formDataPaziente: any): boolean => {
    console.log(formDataPaziente);
    const requiredFieldsFilled = Object.values(formDataPaziente).every(
      (value) => value !== ''
    );
    console.log(
      'req',
      requiredFieldsFilled,
      'nome',
      isNomePazienteValid,
      'cognome',
      isCognomePazienteValid,
      'data',
      isPazienteBirthDateValid,
      'code',
      isCodeValid
    );
    if (
      requiredFieldsFilled &&
      isNomePazienteValid &&
      isCognomePazienteValid &&
      isPazienteBirthDateValid &&
      isCodeValid
    )
      return true;
    else return false;
  };
  const navigate = useNavigate();
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const caregiverFamiliare: CaregiverFamiliare = {
      ...formDataCaregiverFamiliare,
      data_di_nascita: new Date(formDataCaregiverFamiliare.data_di_nascita),
    };

    console.log(caregiverFamiliare);
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
      codice_fiscale: formDataPaziente.codice_fiscale.toUpperCase(),
    };

    console.log(codice_identificativo);
    const pazienteControl: PazienteControl = new PazienteControl();
    console.log(paziente);
    if (!insertValidatePaziente(paziente)) {
      console.log('paziente non valido');
      return;
    }

    pazienteControl
      .inviaDatiPaziente(paziente)
      .then(() => {
        success = true;
        open = true;
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      })
      .catch(() => {
        success = false;
        open = true;
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
          {show && <ResponsiveDialog onClose={() => setShow(false)} />}
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 'wrap',
                    }}
                  >
                    <TextField
                      type="text"
                      name="nome"
                      id="outlined-nome-input"
                      label="Nome"
                      error={!isNomeValid}
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      onChange={handleNomeChange}
                      required
                    />
                    {nomeError && (
                      <div style={{ color: '#D32F2F' }}>{nomeError}</div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 'wrap',
                    }}
                  >
                    <TextField
                      type="text"
                      name="cognome"
                      id="outlined-cognome-input"
                      label="Cognome"
                      error={!isCognomeValid}
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        backgroundColor: '#F6EFF',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      required
                      onChange={handleCognomeChange}
                    />
                    {cognomeError && (
                      <div style={{ color: '#D32F2F' }}>{cognomeError}</div>
                    )}
                  </div>
                </div>

                <div className="riga">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 'wrap',
                    }}
                  >
                    <TextField
                      type="text"
                      name="indirizzo"
                      id="outlined-indirizzo-input"
                      label="Indirizzo"
                      error={
                        !isAndressValid &&
                        formDataCaregiverFamiliare.indirizzo.length > 0
                      }
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        backgroundColor: '#F6EFF',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      required
                      onChange={handleAndressChange}
                    />
                    {andressError && (
                      <div style={{ color: '#D32F2F' }}>{andressError}</div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 'wrap',
                      justifyContent: 'center',
                    }}
                  >
                    <TextField
                      type="text"
                      name="numero_civico"
                      id="outlined-num-civico-input"
                      label="Numero Civico"
                      error={
                        !isNumCivValid &&
                        formDataCaregiverFamiliare.numero_civico.length > 5
                      }
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        backgroundColor: '#F6EFF',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      required
                      onChange={handleNumCivChange}
                    />
                    {numCivError && (
                      <div style={{ color: '#D32F2F', width: '16em' }}>
                        {numCivError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="riga">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 'wrap',
                    }}
                  >
                    <TextField
                      type="text"
                      name="citta"
                      id="outlined-citta-input"
                      label="Città"
                      error={!isCittaValid}
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        backgroundColor: '#F6EFF',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      required
                      onChange={handleCittaChange}
                    />
                    {cittaError && (
                      <div style={{ color: '#D32F2F' }}>{cittaError}</div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 'wrap',
                    }}
                  >
                    <TextField
                      name="data_di_nascita"
                      id="outlined-birthdate-input"
                      label="Data di nascita"
                      error={!isBirthDateValid}
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
                        handleBirthDateChange(e);
                      }}
                    />
                    {birthDateError && (
                      <div style={{ color: '#D32F2F' }}>{birthDateError}</div>
                    )}
                  </div>
                </div>

                <div className="riga">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 'wrap',
                    }}
                  >
                    <TextField
                      type="text"
                      name="numero_di_telefono"
                      id="outlined-num-telefono-input"
                      value={formDataCaregiverFamiliare.numero_di_telefono}
                      label="Numero Telefono"
                      error={
                        !isNumberValid &&
                        formDataCaregiverFamiliare.numero_di_telefono.length ===
                          10
                      }
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        backgroundColor: '#F6EFF',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      required
                      onChange={handleNumberChange}
                    />
                    {numberError && (
                      <div style={{ color: '#D32F2F' }}>{numberError}</div>
                    )}
                  </div>
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
                        color: '#D32F2F',
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
                        color: '#D32F2F',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {passwordError}
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
                    name="conferma-passwd"
                    id="conferma-passwd"
                    required
                    value={confermaPasswd}
                    label="Conferma Password"
                    error={!isConfermaPassValid && confermaPasswd.length > 0}
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
                    onChange={handleConfermaPasswordChange}
                  />
                  {confermaPasswordError && (
                    <div
                      style={{
                        color: '#D32F2F',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {confermaPasswordError}
                    </div>
                  )}
                </div>
                <div className="riga">
                  <Button
                    id="paziente-button"
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
                <div id="cg-fam-title">
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
                </div>
                <div id="codice-fiscale">
                  <div className="riga">
                    <TextField
                      required
                      type="text"
                      label="Codice Fiscale"
                      error={!isCodeValid}
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      name="codice_fiscale"
                      inputProps={{ style: { textTransform: 'uppercase' } }}
                      onChange={handleCodeChange}
                    />
                    {codeError && (
                      <div style={{ color: '#D32F2F' }}>{codeError}</div>
                    )}
                  </div>
                  <div id="nome-paziente">
                    <TextField
                      required
                      type="text"
                      label="Nome"
                      error={!isNomePazienteValid}
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      name="nome_paziente"
                      onChange={handleNomePazienteChange}
                    />
                    {nomePazienteError && (
                      <div style={{ color: '#D32F2F' }}>
                        {nomePazienteError}
                      </div>
                    )}
                  </div>
                </div>
                <div className="riga">
                  <div id="cognome-paziente">
                    <TextField
                      required
                      type="text"
                      label="Cognome"
                      error={!isCognomePazienteValid}
                      style={{
                        width: '16.15em',
                        margin: '1em',
                        boxSizing: 'border-box',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      name="cognome_paziente"
                      onChange={handleCognomePazienteChange}
                    />
                    {cognomePazienteError && (
                      <div style={{ color: '#D32F2F' }}>
                        {cognomePazienteError}
                      </div>
                    )}
                  </div>
                  <div id="data-di-nascita-paziente">
                    <TextField
                      name="data_di_nascita_paziente"
                      id="outlined-birthdate-input"
                      label="Data di nascita"
                      error={!isPazienteBirthDateValid}
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
                        handlePazienteBirthDateChange(e);
                      }}
                    />
                    {pazienteBirthDateError && (
                      <div style={{ color: '#D32F2F' }}>
                        {pazienteBirthDateError}
                      </div>
                    )}
                  </div>
                </div>
                <div className="riga">
                  <Autocomplete
                    loading
                    options={opzioni}
                    getOptionLabel={(op) => op.name}
                    onChange={handleChangeMedico}
                    renderInput={(params) => (
                      <TextField
                        name="autocomplete"
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
                    id="registrazione-button"
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
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success
            ? 'Registrazione effettuata con successo!'
            : 'Registrazione fallita'}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RegistrazioneCaregiverFamiliare;
