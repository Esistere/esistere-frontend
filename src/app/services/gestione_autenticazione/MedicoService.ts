import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import { WEBSERVER } from 'app/config';

class MedicoService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchPazienti(): Promise<Medico[]> {
    const url = `${this.baseUrl}/visualizza_medico`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: Medico[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching pazienti: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching pazienti.');
    }
  }

  async inviaDatiPaziente(datiMedico: Medico): Promise<void> {
    const url = `${this.baseUrl}/salva_medico`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiMedico),
      });

      if (!response.ok) {
        throw new Error('Server returned ${response.status}');
      }
    } catch (error) {
      throw new Error('Errore');
    }
  }
}

export default MedicoService;
