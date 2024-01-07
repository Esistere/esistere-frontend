import { UserType } from 'app/components/gestione_app/UserProvider';
import { WEBSERVER } from 'app/config';

class LoginControl {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async login(email: string, passwd: string): Promise<UserType> {
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
      localStorage.setItem('id', data.id);
      return data.userType === 'medico' ? UserType.medico : UserType.caregiver;
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
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      return data as string;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default LoginControl;
