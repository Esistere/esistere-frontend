export interface StoriaMedia {
  id: number | undefined;
  cg_fam: number;
  testo: string;
  media: {
    id: number | undefined;
    storia: number | undefined,
    allegato: string;
    descrizione: string;
    tipo: number;
  };
}