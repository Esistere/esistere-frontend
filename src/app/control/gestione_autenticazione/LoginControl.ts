import { WEBSERVER } from 'app/config';

export enum TypeUser {
  medico,
  caregiver,
}

export interface LoginResponse {
  jwt: string;
  typeUser: TypeUser;
}

class LoginControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async login(email: string, passwd: string): Promise<LoginResponse> {
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

      const data = await response.json();

      localStorage.setItem('jwt', data.jwt);
      return data as LoginResponse;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default LoginControl;
