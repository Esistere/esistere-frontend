import { RispostaQuizPreliminare } from './RispostaQuizPreliminare';

export interface DomandaRispostaQP {
  idDomanda?: number | undefined;
  domanda: string;
  quiz_preliminare: number | undefined;
  rispostaPaziente: RispostaQuizPreliminare;
}
