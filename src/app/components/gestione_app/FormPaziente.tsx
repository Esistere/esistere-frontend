import React, { useState } from 'react';

const FormElement: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
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
    console.log(formData);
  };

  //formData.<qualcosa> rappresenta
  // l'attributo che sta nel default value di useState()
  return (
    <form onSubmit={handleSubmit}>
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
        type="text"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      ></input>{' '}
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      ></input>
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
