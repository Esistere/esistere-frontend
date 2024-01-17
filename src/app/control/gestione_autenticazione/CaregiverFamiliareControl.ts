import { WEBSERVER } from 'app/config';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';

class CaregiverFamiliareControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }
  async fetchDatiCaregiverFamiliare(
    idCaregiverFamiliare: number
  ): Promise<CaregiverFamiliare> {
    const url =
      `${this.baseUrl}/visualizza_caregiver_familiare` +
      `?id=${idCaregiverFamiliare}`;

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
      const data: CaregiverFamiliare = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching data from server: ${error.message}`);
      else
        throw new Error(
          'Unknown error occurred while fetching  dati caregiverFamiliare.'
        );
    }
  }
  async fetchCaregiversFamiliari(): Promise<CaregiverFamiliare[]> {
    const url = `${this.baseUrl}/visualizza_caregiver_familiari`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: CaregiverFamiliare[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching pazienti: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching pazienti.');
    }
  }

  async modificaCaregiverFamiliare(
    datiCaregiverFamiliare: CaregiverFamiliare
  ): Promise<boolean> {
    const url = `${this.baseUrl}/modifica_caregiver_camiliare`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(datiCaregiverFamiliare),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      return true;
    } catch (error) {
      throw new Error('Error');
    }
  }
  async inviaDatiCaregiverFamiliare(
    datiCaregiverFamiliare: CaregiverFamiliare
  ): Promise<number> {
    const url = `${this.baseUrl}/salva_caregiver_familiare`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiCaregiverFamiliare),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default CaregiverFamiliareControl;
