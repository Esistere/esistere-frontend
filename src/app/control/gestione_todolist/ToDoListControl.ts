import { WEBSERVER } from 'app/config';
import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';
import { Attivita } from 'app/interfaces/gestione_todolist/Attivita';

class ToDoListControl {
  private baseUrl: string;
  constructor() {
    this.baseUrl = WEBSERVER;
  }

  async fetchToDoList(id: number): Promise<ToDoList[]> {
    const url = `${this.baseUrl}}/to_do_list` + `id=${id}`;
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
      const data: ToDoList[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching ToDoList: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching ToDoList.');
    }
  }

  async fetchToDoListByMed(id: number): Promise<ToDoList[]> {
    const url = `${this.baseUrl}/to_do_list_medico` + `idMedico= ${id}`;
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
      const data: ToDoList[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching ToDoList: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching ToDoList.');
    }
  }

  async fetchToDoListByPaziente(codice_fiscale: number): Promise<ToDoList[]> {
    const url =
      `${this.baseUrl}/to_do_list_paziente` +
      `codice_fiscale= ${codice_fiscale}`;
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
      const data: ToDoList[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching ToDoList: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching ToDoList.');
    }
  }

  async fetchToDoListByMedPaziente(
    id: number,
    codice_fiscale: number
  ): Promise<ToDoList[]> {
    const url =
      `${this.baseUrl}/to_do_list_medico_paziente` +
      `id= ${id}&codice_fiscale= ${codice_fiscale}`;
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
      const data: ToDoList[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching ToDoList: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching ToDoList.');
    }
  }

  async inviaDatiToDoList(dataToDoList: ToDoList): Promise<void> {
    const url = `${this.baseUrl}/save_to_do_list`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(dataToDoList),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }

  async modificaDatiToDoList(dataToDoList: ToDoList): Promise<void> {
    const url = `${this.baseUrl}/update_to_do_list`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(dataToDoList),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }

  async fetchAttivita(id: number): Promise<Attivita[]> {
    const url = `${this.baseUrl}/attivita` + `id= ${id}`;
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
      const data: Attivita[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching ToDoList: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching ToDoList.');
    }
  }

  async fetchAttivitaByToDoList(id: number): Promise<Attivita[]> {
    const url = `${this.baseUrl}/attivita_to_do_list` + `id= ${id}`;
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
      const data: Attivita[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching ToDoList: ${error.message}`);
      else throw new Error('Unknown error occurred while fetching ToDoList.');
    }
  }

  async inviaDatiAttivita(dataAttivita: Attivita): Promise<void> {
    const url = `${this.baseUrl}/save_attivita`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(dataAttivita),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }

  async modificaDatiAttivita(dataAttivita: Attivita): Promise<void> {
    const url = `${this.baseUrl}/update_attivita`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(dataAttivita),
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default ToDoListControl;
