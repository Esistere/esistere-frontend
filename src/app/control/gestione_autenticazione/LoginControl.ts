import { WEBSERVER } from 'app/config';

export enum UserType {
  medico,
  caregiver,
}

export interface LoginResponse {
  jwt: string;
  userType: UserType;
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

  async userType(): Promise<string> {
    const url = `${this.baseUrl}/userType`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Server returned ${response.status}');
      }

      const data = await response.json();

      return data as string;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default LoginControl;
