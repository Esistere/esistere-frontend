/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';

const RegistrazioneCaregiverFamiliare: React.FC = () => {
  const [visibility, setVisibility] = useState('none');
  //const [isFirstFormValid, setIsFirstFormValid] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
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

  const handleChangeCaregiverFamiliare = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormDataCaregiverFamiliare({
      ...formDataCaregiverFamiliare,
      [name]: value,
    });

    const isFormValid =
      JSON.stringify(formDataCaregiverFamiliare.citta) !== JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.cognome) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.data_di_nascita) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.email) !== JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.indirizzo) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.nome) !== JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.numero_civico) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.numero_telefono) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.passwd) !== JSON.stringify('');
    setIsFormValid(isFormValid);
    /*isFormValid && isEmailValid && isPassValid
      ? setVisibility('block')
      : setVisibility('none');*/
  };

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const handleMail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormDataCaregiverFamiliare({
      ...formDataCaregiverFamiliare,
      [name]: value,
    });
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/;
    setIsEmailValid(emailRegex.test(value));

    const isFormValid =
      JSON.stringify(formDataCaregiverFamiliare.citta) !== JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.cognome) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.data_di_nascita) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.email) !== JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.indirizzo) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.nome) !== JSON.stringify('') &&
      formDataCaregiverFamiliare.numero_civico !== JSON.stringify('') &&
      formDataCaregiverFamiliare.numero_telefono !== JSON.stringify('') &&
      formDataCaregiverFamiliare.passwd !== JSON.stringify('');
    setIsFormValid(isFormValid);
    /*const isFormValid = Object.values(formDataCaregiverFamiliare).every(
      (value) => value != ''
    );*/
    /*isFormValid && isEmailValid && isPassValid
      ? setVisibility('block')
      : setVisibility('none');*/
  };

  const [isPassValid, setIsPassValid] = useState<boolean>(true);
  const handlePass = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormDataCaregiverFamiliare({
      ...formDataCaregiverFamiliare,
      [name]: value,
    });
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    setIsPassValid(passRegex.test(value));

    const isFormValid =
      JSON.stringify(formDataCaregiverFamiliare.citta) !== JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.cognome) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.data_di_nascita) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.email) !== JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.indirizzo) !==
        JSON.stringify('') &&
      JSON.stringify(formDataCaregiverFamiliare.nome) !== JSON.stringify('') &&
      formDataCaregiverFamiliare.numero_civico !== JSON.stringify('') &&
      formDataCaregiverFamiliare.numero_telefono !== JSON.stringify('') &&
      formDataCaregiverFamiliare.passwd !== JSON.stringify('');

    setIsFormValid(isFormValid);
    setVisibility(
      isFormValid && isEmailValid && isPassValid ? 'block' : 'none'
    );

    /*isFormValid && isEmailValid && isPassValid
      ? setVisibility('block')
      : setVisibility('none');*/
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const caregiverFamiliare: CaregiverFamiliare = {
      nome: formDataCaregiverFamiliare.nome,
      cognome: formDataCaregiverFamiliare.cognome,
      indirizzo: formDataCaregiverFamiliare.indirizzo,
      citta: formDataCaregiverFamiliare.citta,
      numero_civico: formDataCaregiverFamiliare.numero_civico,
      data_di_nascita: new Date(formDataCaregiverFamiliare.data_di_nascita),
      numero_telefono: formDataCaregiverFamiliare.numero_telefono,
      email: formDataCaregiverFamiliare.email,
      passwd: formDataCaregiverFamiliare.passwd,
    };

    const caregiverFamiliareControl: CaregiverFamiliareControl =
      new CaregiverFamiliareControl();

    const codice_identificativo =
      await caregiverFamiliareControl.inviaDatiCaregiverFamiliare(
        caregiverFamiliare
      );

    const paziente: Paziente = {
      codice_fiscale: formDataPaziente.codice_fiscale,
      nome: formDataPaziente.nome,
      cognome: formDataPaziente.cognome,
      data_di_nascita: new Date(formDataPaziente.data_di_nascita),
      med: Number(formDataPaziente.med),
      cg_fam: Number(codice_identificativo),
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
      <form
        method="post"
        style={{ display: 'flex', flexWrap: 'wrap', width: '50%' }}
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          name="nome"
          id="outlined-nome-input"
          required
          label="Nome"
          style={{
            flexBasis: 'calc(26em)',
            margin: '1em',
            boxSizing: 'border-box',
          }}
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <TextField
          type="text"
          name="cognome"
          id="outlined-cognome-input"
          label="Cognome"
          style={{
            flexBasis: 'calc(26em)',
            margin: '1em',
            boxSizing: 'border-box',
          }}
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <TextField
          type="text"
          name="indirizzo"
          id="outlined-indirizzo-input"
          label="Indirizzo"
          style={{
            flexBasis: 'calc(26em)',
            margin: '1em',
            boxSizing: 'border-box',
          }}
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <TextField
          type="text"
          name="citta"
          id="outlined-citta-input"
          label="Città"
          style={{
            flexBasis: 'calc(26em)',
            margin: '1em',
            boxSizing: 'border-box',
          }}
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <TextField
          type="text"
          name="numero_civico"
          id="outlined-num-civico-input"
          label="Numero Civico"
          style={{
            flexBasis: 'calc(26em)',
            margin: '1em',
            boxSizing: 'border-box',
          }}
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <TextField
          type="date"
          name="data_di_nascita"
          id=""
          style={{
            flexBasis: 'calc(26em)',
            margin: '1em',
            boxSizing: 'border-box',
          }}
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <TextField
          type="text"
          name="numero_telefono"
          id="outlined-num-telefono-input"
          label="Numero Telefono"
          style={{
            flexBasis: 'calc(26em)',
            margin: '1em',
            boxSizing: 'border-box',
          }}
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <div style={{ width: '100%' }}>
          <TextField
            type="email"
            name="email"
            id="outlined-email-input"
            label="Email"
            style={{
              flexBasis: '26 em',
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
            onChange={handleMail}
          />
        </div>
        <br />
        <div style={{ width: '100%' }}>
          <TextField
            type={showPassword ? 'text' : 'password'}
            name="passwd"
            id="outlined-password-input"
            label="Password"
            style={{
              flexBasis: '26em',
              margin: '1em',
              boxSizing: 'border-box',
              marginLeft: '20%',
              marginRight: '20%',
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
            onChange={handlePass}
          />
          <button onClick={() => setVisibility('block')}>
            Mostra Paziente
          </button>
        </div>
        <br />
        <div
          style={{
            display: isFormValid ? 'block' : 'none',
            width: '100%',
          }}
        >
          <h2>Paziente</h2>
          <TextField
            required
            type="text"
            label="Codice Fiscale"
            style={{
              flexBasis: 'calc(26em)',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            name="codice_fiscale"
            onChange={handleChangePaziente}
          />
          <br />
          <TextField
            required
            type="text"
            label="Nome"
            style={{
              flexBasis: 'calc(26em)',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            name="nome"
            onChange={handleChangePaziente}
          />
          <br />
          <TextField
            required
            type="text"
            label="Cognome"
            style={{
              flexBasis: 'calc(26em)',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            name="cognome"
            onChange={handleChangePaziente}
          />
          <br />
          <TextField
            required
            type="date"
            name="data_di_nascita"
            style={{
              flexBasis: 'calc(26em)',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChangePaziente}
          />
          <br />
          <TextField
            required
            type="text"
            label="Medico"
            name="med"
            style={{
              flexBasis: 'calc(26em)',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            onChange={handleChangePaziente}
          />
        </div>
        <br />
        <input type="submit" value="Registrati" />
        <div style={{ width: '100%' }}>
          <Button
            style={{
              background: coloreBottone,
              marginLeft: '55%',
              marginRight: '35%',
            }}
            type="submit"
            variant="contained"
            onMouseEnter={() => gestisciHover(true)}
            onMouseLeave={() => gestisciHover(false)}
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
