import React from 'react';
import { useState } from 'react';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import CaregiverFamiliareService from 'app/services/gestione_autenticazione/CaregiverFamiliareService';
import PazienteService from 'app/services/gestione_autenticazione/PazienteService';

const RegistrazioneCaregiverFamiliare: React.FC = () => {
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

    const caregiverFamiliareService: CaregiverFamiliareService =
      new CaregiverFamiliareService();

    const codice_identificativo =
      await caregiverFamiliareService.inviaDatiCaregiverFamiliare(
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

    const pazienteService: PazienteService = new PazienteService();
    try {
      await pazienteService.inviaDatiPaziente(paziente);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          id="outlined-nome-input"
          required
          placeholder="Nome"
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="text"
          name="cognome"
          id="outlined-cognome-input"
          placeholder="Cognome"
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="text"
          name="indirizzo"
          id="outlined-indirizzo-input"
          placeholder="Indirizzo"
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="text"
          name="citta"
          id="outlined-citta-input"
          placeholder="Città"
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="text"
          name="numero_civico"
          id="outlined-num-civico-input"
          placeholder="Numero Civico"
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="date"
          name="data_di_nascita"
          id=""
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="text"
          name="numero_telefono"
          id="outlined-num-telefono-input"
          placeholder="Numero Telefono"
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="email"
          name="email"
          id="outlined-email-input"
          placeholder="Email"
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <input
          type="password"
          name="passwd"
          id="outlined-password-input"
          placeholder="Password"
          required
          onChange={handleChangeCaregiverFamiliare}
        />
        <br />
        <h2>Paziente</h2>
        <input
          required
          type="text"
          placeholder="Codice Fiscale"
          name="codice_fiscale"
          onChange={handleChangePaziente}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Nome"
          name="nome"
          onChange={handleChangePaziente}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Cognome"
          name="cognome"
          onChange={handleChangePaziente}
        />
        <br />
        <input
          required
          type="date"
          name="data_di_nascita"
          onChange={handleChangePaziente}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Medico"
          name="med"
          onChange={handleChangePaziente}
        />
        <br />
        <input type="submit" value="Registrati" />
      </form>
    </>
  );
};

export default RegistrazioneCaregiverFamiliare;
