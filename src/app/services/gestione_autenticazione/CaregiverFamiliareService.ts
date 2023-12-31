import { WEBSERVER } from 'app/config';
import { CaregiverFamiliare } from 'app/interfaces/gestione_autenticazione/CaregiverFamiliare';

class CaregiverFamiliareService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchCaregiversFamiliari(): Promise<CaregiverFamiliare[]> {
    const url = `${this.baseUrl}/visualizza_caregiver_familiare`;
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

  async inviaDatiCaregiverFamiliare(
    datiCaregiverFamiliare: CaregiverFamiliare
  ): Promise<void> {
    const url = `${this.baseUrl}/salva_caregiver_familiare`;
    
    console.log(datiCaregiverFamiliare);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiCaregiverFamiliare),
      });

      if (!response.ok) {
        throw new Error('Server returned ${response.status}');
      }
    } catch (error) {
      throw new Error('Errore');
    }
  }
}

export default CaregiverFamiliareService;
