import { WEBSERVER } from 'app/config';

class LoginControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async login(email: string, passwd: string): Promise<void> {
    const url = `${this.baseUrl}/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, passwd: passwd }),
      });

      if (!response.ok) {
        throw new Error('Server returned ${response.status}');
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default LoginControl;
