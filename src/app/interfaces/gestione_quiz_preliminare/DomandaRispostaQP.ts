import { RispostaQuizPreliminare } from './RispostaQuizPreliminare';

export interface DomandaRispostaQP {
  id?: number | undefined;
  domanda: string;
  quiz_preliminare: number | undefined;
  rispostaPaziente: RispostaQuizPreliminare;
}
