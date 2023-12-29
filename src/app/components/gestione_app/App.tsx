import 'app/css/gestione_app/App.css';
import React from 'react';
import ListaPazienti from './ListaPazienti';
import FormElement from './FormPaziente';

function App(): JSX.Element {
  return (
    <div>
      <ListaPazienti />
      <FormElement />
    </div>
  );
}

export default App;
