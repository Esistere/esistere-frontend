import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import { WEBSERVER } from 'app/config';
import { Paziente } from 'app/interfaces/gestione_autenticazione/Paziente';

class MedicoControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchDatiMedico(idMedico: number): Promise<Medico> {
    const url = `${this.baseUrl}/visualizza_medico` + `?id=${idMedico}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`);
      }
      const data: Medico = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching data from server: ${error.message}`);
      else
        throw new Error('Unknown error occurred while fetching  dati medico.');
    }
  }
  async fetchMedici(): Promise<Medico[]> {
    const url = `${this.baseUrl}/visualizza_medici`;
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

  async inviaDatiMedico(datiMedico: Medico): Promise<void> {
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
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
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

  async fetchPaziente(cf: string): Promise<Paziente> {
    const url = `${this.baseUrl}/visualizza_paziente_med` + `?cf=${cf}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ cf }),
      });

      const paziente = await response.json();
      return paziente;
    } catch (error) {
      throw new Error('Error fetching paziente');
    }
  }

  async modificaMedico(datiMedico: Medico): Promise<boolean> {
    const url = `${this.baseUrl}/modifica_medico`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(datiMedico),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      return true;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default MedicoControl;
