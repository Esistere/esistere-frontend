import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { DomandaRispostaQP } from 'app/interfaces/gestione_quiz_preliminare/DomandaRispostaQP';

export interface ResponseObjectQP {
  domandeRisposte: { [key: string]: DomandaRispostaQP };
  quizPreliminare: QuizPreliminare;
}
