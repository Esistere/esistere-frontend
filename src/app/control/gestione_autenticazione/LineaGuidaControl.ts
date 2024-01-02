import { LineaGuida } from 'app/interfaces/gestione_autenticazione/LineaGuida';
import { WEBSERVER } from 'app/config';

class LineaGuidaControl {
  private baseUrl: string;
  constructor() {
    this.baseUrl = WEBSERVER;
  }
  async fetchLineeGuida(): Promise<LineaGuida[]> {
    // TODO fix url
    const url = `${this.baseUrl}/visualizza_medico`;
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
  async inviaDatiQuiz(datiLineeGUida: LineaGuida): Promise<void> {
    // TODO fix url
    const url = `${this.baseUrl}/salva_medico`;
    console.log(datiLineeGUida);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiLineeGUida),
      });

      if (!response.ok) {
        throw new Error('Server returned ${response.status}');
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default LineaGuidaControl;
