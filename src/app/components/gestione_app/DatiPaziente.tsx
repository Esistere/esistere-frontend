import { useState } from 'react';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';

interface DatiPazienteResult {
  paziente: Paziente | null;
  fetchPazienteData: (cf: string) => Promise<void>;
}

const DatiPaziente = (): DatiPazienteResult => {
  const [paziente, setPaziente] = useState<Paziente | null>(null);

  const fetchPazienteData = async (cf: string): Promise<void> => {
    const pazienteControl = new PazienteControl();

    try {
      const data = await pazienteControl.fetchDatiPaziente(cf);
      setPaziente(data);
    } catch (error) {
      console.error('Error fetching paziente:', error);
    }
  };

  return { paziente, fetchPazienteData };
};

export default DatiPaziente;
