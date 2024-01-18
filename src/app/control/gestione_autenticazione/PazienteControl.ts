import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { WEBSERVER } from 'app/config';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';

class PazienteControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchPazienti(): Promise<Paziente[]> {
    const url = `${this.baseUrl}/visualizza_pazienti`;
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

  async fetchCodicePaziente(id: number): Promise<string> {
    const url = `${this.baseUrl}/visualizza_codice_fiscale` + `?id=${id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      const codice = await response.json();
      return codice;
    } catch (error) {
      throw new Error('Error fetching paziente');
    }
  }

  async fetchDatiPaziente(codice_fiscale: string): Promise<Paziente> {
    const url = `${this.baseUrl}/visualizza_paziente`;

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

  async inviaDatiPaziente(datiPaziente: Paziente): Promise<number> {
    const url = `${this.baseUrl}/salva_paziente`;

    let risp = 200;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiPaziente),
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      risp = response.status;
      return risp;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  async visualizzaCgFamByPaziente(id: number): Promise<CaregiverFamiliare> {
    const url = `${this.baseUrl}/visualizza_caregiver` + `?id=${id}`;
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
      const data: CaregiverFamiliare = await response.json();
      return data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}

export default PazienteControl;
