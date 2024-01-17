import { Attivita } from './Attivita';
import { ToDoList } from './ToDoList';

export interface ResponseObjectToDoList {
  toDoList: ToDoList;
  attivita: Attivita[];
}
