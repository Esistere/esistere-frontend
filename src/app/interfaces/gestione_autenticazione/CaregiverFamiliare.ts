export interface CaregiverFamiliare {
  codice_identificativo?: number | undefined;
  nome: string;
  cognome: string;
  indirizzo: string;
  citta: string;
  numero_civico: string;
  data_di_nascita: Date;
  numero_di_telefono: string;
  email: string;
  passwd: string;
}
