import { LineaGuida } from 'app/interfaces/gestione_autenticazione/LineaGuida';
import { WEBSERVER } from 'app/config';

class LineaGuidaControl {
  private baseUrl: string;
  constructor() {
    this.baseUrl = WEBSERVER;
  }
  async fetchLineeGuida(): Promise<LineaGuida[]> {
    const url = `${this.baseUrl}/visualizza_linee_guida`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: LineaGuida[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching medici: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching medici.');
    }
  }

  async fetchLineaGuidaByMed(id: number): Promise<LineaGuida> {
    const url = `${this.baseUrl}/visualizza_linea_guida_medico` + `id= ${id}`;
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

      const data: LineaGuida = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching linea guida: ${error.message}`);
      else
        throw new Error('Unknown error occurred while fetching linea guida.');
    }
  }

  async inviaDatiQuiz(datiLineeGUida: LineaGuida): Promise<void> {
    const url = `${this.baseUrl}/salva_linee_guida`;
    console.log(datiLineeGUida);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(datiLineeGUida),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default LineaGuidaControl;
