import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { DomandaRisposta } from '../gestione_quiz_allenamento/DomandaRisposta';

export interface ResponseObjectQP {
  domandeRisposte: { [key: string]: DomandaRisposta };
  quizPreliminare: QuizPreliminare;
}
