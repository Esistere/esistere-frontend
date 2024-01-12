import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';
import { WEBSERVER } from 'app/config';

class PazienteControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
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
}

export default PazienteControl;
