export interface RispostaQuizAllenamento {
  id?: number | undefined;
  domanda_ag: number;
  risposta: string;
  corretta?: boolean | undefined;
  selezionata?: boolean | undefined;
}
