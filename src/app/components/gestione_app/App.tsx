import logo from 'app/assets/logo.svg';
import 'app/css/gestione_app/App.css';
import React, { useEffect, useState } from 'react';
import ListaPazienti from './ListaPazienti';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">{ListaPazienti()}</header>
    </div>
  );
}

export default App;
