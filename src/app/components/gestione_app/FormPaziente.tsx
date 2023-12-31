import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import React, { useState } from 'react';
import PazienteService from 'app/services/gestione_autenticazione/PazienteService';

function FormPaziente(): JSX.Element {
  const [formData, setFormData] = useState({
    codice_fiscale: '',
    nome: '',
    cognome: '',
    data_di_nascita: '',
    med: '',
    cg_fam: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const paziente: Paziente = {
      codice_fiscale: formData.codice_fiscale,
      nome: formData.nome,
      cognome: formData.cognome,
      data_di_nascita: new Date(formData.data_di_nascita),
      med: Number(formData.med),
      cg_fam: Number(formData.cg_fam),
    };

    const pazienteService = new PazienteService();
    pazienteService
      .inviaDatiPaziente(paziente)
      .then(() => {
        console.log('Dati inviati con successo');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Codice Fiscale"
          name="codice_fiscale"
          onChange={handleChange}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Nome"
          name="nome"
          onChange={handleChange}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Cognome"
          name="cognome"
          onChange={handleChange}
        />
        <br />
        <input
          required
          type="date"
          name="data_di_nascita"
          onChange={handleChange}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Caregiver o Familiare"
          name="cg_fam"
          onChange={handleChange}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Medico"
          name="med"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Salva Dati Pazienti"></input> <br />
      </form>
    </>
  );
}

export default FormPaziente;
