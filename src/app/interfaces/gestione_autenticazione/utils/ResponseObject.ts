import { DomandaRisposta } from 'app/interfaces/gestione_quiz_allenamento/DomandaRisposta';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';

export interface ResponseObject {
  domandeRisposte: { [key: string]: DomandaRisposta };
  quizAllenamento: QuizAllenamentoGiornaliero;
}
