import React from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import logo from 'app/assets/logo.svg';

function ElementoLista(
  index: number,
  name: string,
  surname: string
): JSX.Element {
  return (
    <div key={index} className="elemento">
      <img className="propiclist" src={logo} alt={'paziente ' + { index }} />
      <p className="pp">
        {name} {surname}
      </p>
      <br />
    </div>
  );
}

export default ElementoLista;
