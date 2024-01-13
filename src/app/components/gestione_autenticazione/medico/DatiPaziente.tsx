import { useState } from 'react';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import MedicoControl from 'app/control/gestione_autenticazione/MedicoControl';

interface DatiPazienteResult {
  paziente: Paziente | null;
  fetchPazienteData: (cf: string) => Promise<void>;
}

const DatiPaziente = (): DatiPazienteResult => {
  const [paziente, setPaziente] = useState<Paziente | null>(null);

  const fetchPazienteData = async (cf: string): Promise<void> => {
    const medicoControl = new MedicoControl();

    try {
      const data = await medicoControl.fetchPaziente(cf);
      setPaziente(data);
    } catch (error) {
      console.error('Error fetching paziente:', error);
    }
  };

  return { paziente, fetchPazienteData };
};

export default DatiPaziente;
