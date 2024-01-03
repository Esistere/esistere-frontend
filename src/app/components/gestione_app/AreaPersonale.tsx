import React from 'react';
import TextField from '@mui/material/TextField';
import 'app/css/gestione_app/FormElements.css';

function AreaPersonale(): JSX.Element {
  return (
    <>
      <form style={{ display: 'flex', flexWrap: 'wrap', width: '50%' }}>
        <div className="riga">
          <TextField
            disabled
            required
            type="text"
            id="outline-nome"
            label="Nome"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value="Giovanni"
          />

          <TextField
            disabled
            required
            type="text"
            id="outline-cognome"
            label="Cognome"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value="Rossi"
          />
        </div>
        <div className="riga">
          <TextField
            disabled
            required
            type="text"
            id="outlined-indirizzo"
            label="Indirizzo"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value="Via del pensiero"
          />

          <TextField
            disabled
            required
            type="date"
            id="outline-Data_di_nascita"
            label="Data di nascita"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value="01/01/1991"
          />
        </div>
        <div className="riga">
          <TextField
            disabled
            required
            type="text"
            id="outlined-Codice_Fiscale"
            label="Codice Fiscale"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value="RSSGNN91A01H703B"
          />

          <TextField
            disabled
            required
            type="email"
            id="outlined-Email"
            label="Email"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value="bho@example.it"
          />
          <div className="riga">
            <TextField
              disabled
              required
              type="password"
              id="outlined-password"
              style={{
                width: '16.15em',
                margin: '1em',
                boxSizing: 'border-box',
              }}
              value="Passw@1991"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default AreaPersonale;
