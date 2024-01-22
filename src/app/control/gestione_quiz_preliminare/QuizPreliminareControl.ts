import { WEBSERVER } from 'app/config';
import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { DomandaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/DomandaQuizPreliminare';
import { RispostaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/RispostaQuizPreliminare';
import { ResponseObjectQP } from 'app/interfaces/utils/ResponseObjectQP';
class QuizPreliminareControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchQuizPreliminari(med: number): Promise<QuizPreliminare[]> {
    const url = `${this.baseUrl}/quiz_preliminari` + `id=${med}`;
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
      const data: QuizPreliminare[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching quiz: ${error.message}`);
      else throw new Error('Unknown error occured while fetching quiz');
    }
  }

  async inviaDatiQuizPreliminare(
    datiQuizPreliminare: QuizPreliminare[]
  ): Promise<void> {
    const url = `${this.baseUrl}/salva_quiz`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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

  async fetchDomandeQuizPreliminare(
    id_quiz: number
  ): Promise<DomandaQuizPreliminare[]> {
    const url = `${this.baseUrl}/domande_quiz` + `id_quiz= ${id_quiz}`;
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
      const data: DomandaQuizPreliminare[] = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async inviaQuizPreliminare(
    quizPreliminare: ResponseObjectQP
  ): Promise<boolean> {
    const url = `${this.baseUrl}/salva_quiz_preliminare`;
    console.log(quizPreliminare);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(quizPreliminare),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      return response.ok ? true : false;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async visualizzaQuizPreliminare(idQuiz: number): Promise<ResponseObjectQP> {
    const url = `${this.baseUrl}/visualizza_quiz_preliminare` + `id=${idQuiz}`;

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
      const ResponseObject = await response.json();
      return ResponseObject;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async visualizzaQuizPreliminareByPaz(paz: string): Promise<ResponseObjectQP> {
    const url = `${this.baseUrl}/visualizza_quiz_preliminare_paziente`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(paz),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const ResponseObject = await response.json();
      return ResponseObject;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async aggiungiRispostePreliminare(
    risposte: RispostaQuizPreliminare[]
  ): Promise<boolean> {
    const url = `${this.baseUrl}/aggiungi_risposte_preliminare`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(risposte),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      return response.ok ? true : false;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default QuizPreliminareControl;
