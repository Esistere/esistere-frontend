export interface Attivita {
  id: number | undefined;
  testo: string;
  completata: boolean;
  commento: string;
  valutazione: number;
  to_do_list: number | undefined;
}
