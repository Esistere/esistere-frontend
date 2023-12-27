import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { WEBSERVER } from 'app/config';

class PazienteService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchPazienti(): Promise<Paziente[]> {
    const url = `${this.baseUrl}/visualizza_pazienti`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: Paziente[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching pazienti: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching pazienti.');
    }
  }
}

export default PazienteService;
