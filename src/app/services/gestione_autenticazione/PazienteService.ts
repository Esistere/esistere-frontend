import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { WEBSERVER } from 'app/config';

class PazienteService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchDatiPaziente(codice_fiscale: string): Promise<Paziente> {
    const url = `${this.baseUrl}/dati_paziente`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(codice_fiscale),
      });

      const paziente = await response.json();
      return paziente;
    } catch (error) {
      throw new Error('Error fething paziente');
    }
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

  async inviaDatiPaziente(datiPaziente: Paziente): Promise<void> {
    const url = `${this.baseUrl}/salva_paziente`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiPaziente),
      });

      if (!response.ok) {
        throw new Error('Server returned ${response.status}');
      }
    } catch (error) {
      throw new Error('Errore');
    }
  }
}

export default PazienteService;
