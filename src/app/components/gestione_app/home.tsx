import 'app/css/gestione_app/App.css';
import React from 'react';
import ListaPazienti from './ListaPazienti';
import FormElement from './FormPaziente';
import logo from 'app/assets/logo.svg';

function Appp(): JSX.Element {
  return (
    <div>
      <img src={logo} alt="logo" />
    </div>
  );
}

export default Appp;
