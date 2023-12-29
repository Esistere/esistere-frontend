import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import React, { useState } from 'react';
import PazienteService from 'app/services/gestione_autenticazione/PazienteService';

const FormElement: React.FC = () => {
  const [formData, setFormData] = useState({
    codice_fiscale: '',
    nome: '',
    cognome: '',
    data_di_nascita: '',
    cg_fam: '',
    medico: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Al submit stampa in console i campi del form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const paziente : Paziente = {
      codice_fiscale: formData.codice_fiscale,
      nome: formData.nome,
      cognome: formData.cognome,
      data_di_nascita: new Date(formData.data_di_nascita),
      cg_fam: Number(formData.cg_fam),
      med: Number(formData.medico)
    };
    
    const pazienteService = new PazienteService();
    pazienteService.inviaDatiPaziente(paziente).then(() =>{
      console.log('Dati inviati con successo' + paziente);
    }).catch((e) => {
      console.error('Dati non inviati correttamente' + e);
    });
  };

  // formData.<qualcosa> rappresenta
  // l'attributo che sta nel default value di useState()
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Codice Fiscale"
        name="codice_fiscale"
        value={formData.codice_fiscale}
        onChange={handleChange}
      ></input>{' '}
      <input
        type="text"
        placeholder="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
      ></input>{' '}
      <br />
      <input
        type="text"
        placeholder="Cognome"
        name="cognome"
        value={formData.cognome}
        onChange={handleChange}
      ></input>{' '}
      <br />
      <input
        type="date"
        name="data_di_nascita"
        value={formData.data_di_nascita}
        onChange={handleChange}
      ></input>{' '}
      <br />
      <input
        type="text"
        placeholder="Caregiver o Familiare"
        name="cg_fam"
        value={formData.cg_fam}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        placeholder="Medico"
        name="medico"
        value={formData.medico}
        onChange={handleChange}
      ></input>{' '}
      <br />
      <input type="submit" value="Submit"></input> <br />
    </form>
  );
};

export default FormElement;
