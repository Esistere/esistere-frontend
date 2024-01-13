import { WEBSERVER } from 'app/config';
import { Tac } from 'app/interfaces/gestione_tac/Tac';

class TacControl {
  baseUrl = WEBSERVER;

  async fetchTac(idTac: number): Promise<Tac> {
    const url = `${this.baseUrl}/tac?id=${idTac}`;
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
    const tac = await response.json();
    return tac;
  }

  async getTacByPaziente(codice_fiscale: string): Promise<Tac[]> {
    const url = `${this.baseUrl}/tac_paziente`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ codice_fiscale }),
    });
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    const tac = await response.json();
    return tac;
  }

  async updateTac(tac: Tac): Promise<void> {
    const url = `${this.baseUrl}/update_tac`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(tac),
    });
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
  }

  async saveTac(tac: Tac, file: File): Promise<void> {
    const url = `${this.baseUrl}/save_tac`;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('data', JSON.stringify(tac));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
  }
}

export default TacControl;
