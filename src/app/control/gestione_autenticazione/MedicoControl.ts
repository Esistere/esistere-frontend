import { Medico } from 'app/interfaces/gestione_autenticazione/Medico';
import { MedicoPerAutocomplete } from 'app/interfaces/utils/MedicoPerAutocomplete';
import { WEBSERVER } from 'app/config';

class MedicoControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchMedici(): Promise<MedicoPerAutocomplete[]> {
    const url = `${this.baseUrl}/visualizza_medici`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: Medico[] = await response.json();

      const mediciOptions: MedicoPerAutocomplete[] = data.map((medico) => ({
        name: `${medico.nome} ${medico.cognome}`,
        value: medico.codice_identificativo?.toString() || '',
      }));

      return mediciOptions;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching pazienti: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching pazienti.');
    }
  }

  async inviaDatiMedico(datiMedico: Medico): Promise<void> {
    const url = `${this.baseUrl}/salva_medico`;
    console.log(datiMedico);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiMedico),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default MedicoControl;
