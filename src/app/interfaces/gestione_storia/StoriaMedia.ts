export interface StoriaMedia {
  id: number | undefined;
  cg_fam: number;
  testo: string;
  media: {
    id: number | undefined;
    storia: number | undefined,
    descrizione: string;
    tipo: number;
  };
}