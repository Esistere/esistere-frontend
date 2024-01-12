import { WEBSERVER } from 'app/config';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';
import { DomandaRisposta } from 'app/interfaces/gestione_quiz_allenamento/DomandaRisposta';
import { ResponseObject } from 'app/interfaces/gestione_autenticazione/utils/ResponseObject';

class QuizAllenamentoControl {
  private baseUrl: string;
  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchQuizAllenamentoGiornaliero(
    id: number
  ): Promise<QuizAllenamentoGiornaliero[]> {
    const url = `${this.baseUrl}/quiz_allenamento_giornaliero`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ id }),
      });
      const quiz_allenamento_giornaliero = await response.json();
      return quiz_allenamento_giornaliero;
    } catch (error) {
      throw new Error('Error fetching quiz allenamento giornaliero');
    }
  }

  async fetchQuizAllenamento(
    id: number
  ): Promise<QuizAllenamentoGiornaliero[]> {
    const url = `${this.baseUrl}/quiz_allenamento_cgfam` + `id = ${id}`;
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
      const data: QuizAllenamentoGiornaliero[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching quiz allenamento: ${error.message}`);
      else
        throw new Error(
          'Unknown error occurred while fetching quiz allenamento.'
        );
    }
  }

  async fetchDatiDomandaQuizAllenamento(
    id: number
  ): Promise<DomandaRisposta[]> {
    const url = `${this.baseUrl}/domanda_allenamento_giornaliero`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const data: DomandaRisposta[] = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching domande');
    }
  }

  async fetchDomandaQuizAllenamento(id: number): Promise<DomandaRisposta[]> {
    const url = `${this.baseUrl}/domanda_allenamento_quiz_ag` + `id = ${id}`;
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
      const data: DomandaRisposta[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(
          `Error fetching domande quiz allenamento: ${error.message}`
        );
      else
        throw new Error(
          'Unknown error occurred while fetching domande quiz allenamento.'
        );
    }
  }

  async inviaDatiDomandaQuizAllenamento(
    datiDomandaAllenamentoGiornaliero: DomandaRisposta[]
  ): Promise<void> {
    const url = `${this.baseUrl}/salva_domanda_allenamento`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(datiDomandaAllenamentoGiornaliero),
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

  async fetchRispostaQuizAllenamento(id: number): Promise<DomandaRisposta[]> {
    const url = `${this.baseUrl}/risposta_allenamento_giornaliero_domanda_ag`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const data: DomandaRisposta[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(
          `Error fetching risposte quiz allenamento: ${error.message}`
        );
      else
        throw new Error(
          'Unknown error occurred while fetching risposte quiz allenamento.'
        );
    }
  }

  async inviaDatiRispostaQuizAllenamento(
    datiRispostaQuizAllenamento: DomandaRisposta
  ): Promise<void> {
    const url = `${this.baseUrl}/salva_risposta_allenamento`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(datiRispostaQuizAllenamento),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }

  async inviaQuizAllenamento(quizAllenamento: ResponseObject): Promise<void> {
    const url = `${this.baseUrl}/salva_quiz_allenamento`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(quizAllenamento),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default QuizAllenamentoControl;
