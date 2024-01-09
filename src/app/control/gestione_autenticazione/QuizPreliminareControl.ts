import { WEBSERVER } from 'app/config';
import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { DomandaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/DomandaQuizPreliminare';
import { RispostaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/RispostaQuizPreliminare';
class QuizPreliminareControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }
  async fetchQuizPreliminari(): Promise<QuizPreliminare[]> {
    const url = `${this.baseUrl}/quiz_preliminari`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const data: QuizPreliminare[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching quiz: ${error.message}`);
      else throw new Error('Unknown error occured while fetching quiz');
    }
  }
  async inviaDatiQuizPreliminare(
    datiQuizPreliminare: QuizPreliminare
  ): Promise<void> {
    const url = `${this.baseUrl}/salva_quiz`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(datiQuizPreliminare),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const codice_identificativoJSON = await response.json();
      return codice_identificativoJSON.id.codice_identificativo;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async inviaDatiDomandaQuizPreliminare(
    datiDomandaQuizPreliminare: DomandaQuizPreliminare
  ): Promise<number> {
    const url = `${this.baseUrl}/salva_domanda_preliminare`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiDomandaQuizPreliminare),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const codice_identificativoJSON = await response.json();
      return codice_identificativoJSON.id.codice_identificativo;
    } catch (error) {
      throw new Error('Error');
    }
  }
  async inviaDatiRispostaPreliminare(
    datiRispostaPreliminare: RispostaQuizPreliminare
  ): Promise<number> {
    const url = `${this.baseUrl}/salva_risposta`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiRispostaPreliminare),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const codice_identificativoJSON = await response.json();
      return codice_identificativoJSON.id.codice_identificativo;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default QuizPreliminareControl;
