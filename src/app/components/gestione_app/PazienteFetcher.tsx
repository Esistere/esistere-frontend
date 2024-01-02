import { useState } from 'react';
import PazienteService from 'app/control/gestione_autenticazione/PazienteControl';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';

interface UseFetchPazienteDataResult {
  paziente: Paziente | null;
  fetchPazienteData: (cf: string) => Promise<void>;
}

const useFetchPazienteData = (): UseFetchPazienteDataResult => {
  const [paziente, setPaziente] = useState<Paziente | null>(null);

  const fetchPazienteData = async (cf: string): Promise<void> => {
    const pazienteService = new PazienteService();

    try {
      const data = await pazienteService.fetchDatiPaziente(cf);
      setPaziente(data);
    } catch (error) {
      console.error('Error fetching paziente:', error);
    }
  };

  return { paziente, fetchPazienteData };
};

export default useFetchPazienteData;
