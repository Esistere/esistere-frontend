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

  async inviaStoria(
    datiStoria: StoriaMedia,
    file: File | null
  ): Promise<boolean> {
    const url = `${this.baseUrl}/save_storia`;
    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('data', JSON.stringify(datiStoria));

    try {
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
      return response.ok ? true : false;
    } catch (error) {
      throw new Error('Error');
    }
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
