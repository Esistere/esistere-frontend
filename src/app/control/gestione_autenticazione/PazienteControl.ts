import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { WEBSERVER } from 'app/config';

class PazienteControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchPazienti(id: number): Promise<Paziente[]> {
    const url = `${this.baseUrl}/visualizza_pazienti_med?` + `id=${id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

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

  async fetchDatiPaziente(codice_fiscale: string): Promise<Paziente> {
    const url = `${this.baseUrl}/dati_paziente`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codice_fiscale }),
      });

      const paziente = await response.json();
      return paziente;
    } catch (error) {
      throw new Error('Error fetching paziente');
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
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default PazienteControl;
