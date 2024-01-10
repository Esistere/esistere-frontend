export interface DomandaRisposta {
  quiz_ag: number;
  domanda: string;
  corretta: boolean;
  risposte: {
    domanda_ag: number;
    risposta: string;
    corretta: boolean;
    selezionata: boolean;
  }[];
}
