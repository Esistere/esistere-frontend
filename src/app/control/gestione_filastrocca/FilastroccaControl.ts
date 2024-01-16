import { WEBSERVER } from 'app/config';
import { Filastrocca } from 'app/interfaces/gestione_filastrocche/Filastrocca';

class FilastroccaControl {
  private baseUrl: string;
  constructor() {
    this.baseUrl = WEBSERVER;
  }
  async fetchFilastrocche(id: number): Promise<Filastrocca[]> {
    const url = `${this.baseUrl}/filastrocche_cgfam` + `idCgFam=${id}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const data: Filastrocca[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching filastrocche: ${error.message}`);
      else
        throw new Error('Unknown error occurred while fetching filastrocche.');
    }
  }

  async fetchDatiFilastrocche(id: number): Promise<Filastrocca[]> {
    const url = `${this.baseUrl}/filastrocca`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ id }),
      });

      const filastrocca = await response.json();
      return filastrocca;
    } catch (error) {
      throw new Error('Error fetching filastrocca');
    }
  }

  async inviaDatiFilastrocca(datiFilastrocca: Filastrocca): Promise<void> {
    const url = `${this.baseUrl}/salva_filastrocca`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(datiFilastrocca),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }

  async modificaFilastrocca(datiFilastrocca: Filastrocca): Promise<void> {
    const url = `${this.baseUrl}/update_filastrocca`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(datiFilastrocca),
      });
      if (response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default FilastroccaControl;
