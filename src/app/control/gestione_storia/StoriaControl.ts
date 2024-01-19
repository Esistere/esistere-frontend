import { WEBSERVER } from 'app/config';
import { StoriaMedia } from 'app/interfaces/gestione_storia/StoriaMedia';

class StoriaControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchStoria(idStoria: number): Promise<StoriaMedia> {
    const url = `${this.baseUrl}/storia?id=${idStoria}`;
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
    const storiaMedia = await response.json();
    return storiaMedia;
  }

  async getMediaUrl(allegato: string): Promise<string> {
    const url = `${this.baseUrl}/${allegato}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const blob = await response.blob();
    const mediaUrl = URL.createObjectURL(blob);
    return mediaUrl;
  }
}

export default StoriaControl;
