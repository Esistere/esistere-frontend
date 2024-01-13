import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import 'app/css/gestione_app/FormElements.css';
import CaregiverFamiliareControl from 'app/control/gestione_autenticazione/CaregiverFamiliareControl';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';

function AreaPersonaleCaregiver(): JSX.Element {
  const [caregiverData, setCaregiverData] = useState<CaregiverFamiliare | null>(
    null
  );
  useEffect(() => {
    const caregiverControl = new CaregiverFamiliareControl();

    const fetchCaregiverData = async (): Promise<void> => {
      try {
        const idCaregiver = Number(localStorage.getItem('id'));
        const caregiver = await caregiverControl.fetchDatiCaregiverFamiliare(
          idCaregiver
        );
        setCaregiverData(caregiver);
      } catch (error) {
        console.error('Errore nel recupero dei dati del caregiver', error);
      }
    };

    fetchCaregiverData();
  }, []);

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
            value={caregiverData?.nome || ''}
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
            value={caregiverData?.cognome || ''}
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
            value={caregiverData?.indirizzo || ''}
          />

          <TextField
            disabled
            required
            type="text"
            id="outline-citta"
            label="Città"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value={caregiverData?.citta || ''}
          />
        </div>
        <div className="riga">
          <TextField
            disabled
            required
            type="text"
            id="outlined-numero_civivo"
            label="Numero Civico"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value={caregiverData?.numero_civico || ''}
          />
          <div className="riga">
            <TextField
              disabled
              required
              type="date"
              id="outlined-data"
              label="Data di Nascita"
              style={{
                width: '16.15em',
                margin: '1em',
                boxSizing: 'border-box',
              }}
              value={caregiverData?.data_di_nascita || ''}
            />
          </div>
          <TextField
            disabled
            required
            type="text"
            id="outlined-telefono"
            label="Telefono"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value={caregiverData?.numero_telefono || ''}
          />
        </div>

        <div className="riga">
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
            value={caregiverData?.email || ''}
          />
        </div>
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
            value={caregiverData?.passwd || ''}
          />
        </div>
      </form>
    </>
  );
}

export default AreaPersonaleCaregiver;
