export interface DomandaQuizAllenamento {
  id?: number | undefined;
  quiz_ag: number;
  domanda: string;
  corretta?: boolean | undefined;
}
