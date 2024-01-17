import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import 'app/css/gestione_app/FormElements.css';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';
import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import Navbar from 'app/components/Navbar';
function AreaPersonaleMedico(): JSX.Element {
  const [medicoData, setMedicoData] = useState<Medico | null>(null);

  useEffect(() => {
    const medicoControl = new MedicoControl();

    const fetchMedicoData = async (): Promise<void> => {
      try {
        const idMedico = Number(localStorage.getItem('id'));
        const medico = await medicoControl.fetchDatiMedico(idMedico);
        setMedicoData(medico);
      } catch (error) {
        console.error('Errore nel recupero dei dati del medico', error);
      }
    };

    fetchMedicoData();
  }, []);

  return (
    <>
      <Navbar />
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
            value={medicoData?.nome || ''}
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
            value={medicoData?.cognome || ''}
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
            value={medicoData?.indirizzo_studio || ''}
          />

          <TextField
            disabled
            required
            type="text"
            id="outline-citta"
            label="citta"
            style={{
              width: '16.15em',
              margin: '1em',
              boxSizing: 'border-box',
            }}
            value={medicoData?.citta || ''}
          />
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
              value={medicoData?.numero_civico || ''}
            />

            <TextField
              disabled
              required
              type="text"
              id="outlined-telefono"
              label="Telefono Studio"
              style={{
                width: '16.15em',
                margin: '1em',
                boxSizing: 'border-box',
              }}
              value={medicoData?.numero_telefono_studio || ''}
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
              value={medicoData?.email || ''}
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
              value={medicoData?.passwd || ''}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default AreaPersonaleMedico;
