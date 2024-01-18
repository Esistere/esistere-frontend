export interface DomandaRisposta {
  quiz_ag: number | undefined;
  domanda: string;
  corretta: boolean | undefined;
  risposte: {
    domanda_ag: number | undefined;
    risposta: string;
    corretta: boolean | undefined;
    selezionata: boolean | undefined;
    id: number | undefined;
  }[];
}
