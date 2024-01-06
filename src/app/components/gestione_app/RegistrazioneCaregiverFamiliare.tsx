import React from 'react';
import { useState } from 'react';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import {
  ArrowForwardIos,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';

const RegistrazioneCaregiverFamiliare: React.FC = () => {
  const [visibilityCG, setVisibilityCG] = useState<string>('block');
  const [visibilityPAZ, setVisibilityPAZ] = useState<string>('none');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPassValid, setIsPassValid] = useState<boolean>(true);
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

  const controlla_mail = (): void => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/;
    setIsEmailValid(emailRegex.test(formDataCaregiverFamiliare.email));
  };

  const controlla_pass = (): void => {
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    setIsPassValid(passRegex.test(formDataCaregiverFamiliare.passwd));
  };

  const handleChangeCaregiverFamiliare = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormDataCaregiverFamiliare({
      ...formDataCaregiverFamiliare,
      [name]: value,
    });
    formDataCaregiverFamiliare.email.length > 0 ? controlla_mail() : null;
    formDataCaregiverFamiliare.passwd.length > 0 ? controlla_pass() : null;
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

  const handleInserisciPaziente = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    if (isEmailValid && isPassValid) {
      setVisibilityCG('none');
      setVisibilityPAZ('block');
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
    console.log(
      typeof codice_identificativo,
      codice_identificativo,
      typeof Number(codice_identificativo),
      Number(codice_identificativo)
    );

    const paziente: Paziente = {
      ...formDataPaziente,
      data_di_nascita: new Date(formDataPaziente.data_di_nascita),
      med: Number(formDataPaziente.med),
      cg_fam: codice_identificativo,
    };

    const pazienteControl: PazienteControl = new PazienteControl();
    try {
      await pazienteControl.inviaDatiPaziente(paziente);
    } catch (e) {
      console.error(e);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const [coloreBottone, impostaColoreBottone] = useState<string>('#9149f3');

  const gestisciHover = (isHovered: boolean): void => {
    const nuovoColore = isHovered ? '#8036a1' : '#9149f3';
    impostaColoreBottone(nuovoColore);
  };

  return (
    <>
      <form className="formflex" style={{ display: visibilityCG }}>
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
            name="citta"
            id="outlined-citta-input"
            label="Città"
            style={{ width: '16.15em', margin: '1em', boxSizing: 'border-box' }}
            required
            onChange={handleChangeCaregiverFamiliare}
          />
        </div>
        <div className="riga">
          <TextField
            type="text"
            name="numero_civico"
            id="outlined-num-civico-input"
            label="Numero Civico"
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
      <form
        method="post"
        className="formflex"
        style={{ display: visibilityPAZ }}
        onSubmit={handleSubmit}
      >
        <h2>Paziente</h2>
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
          <TextField
            required
            type="text"
            label="Medico"
            name="med"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChangePaziente}
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
    </>
  );
};

export default RegistrazioneCaregiverFamiliare;
