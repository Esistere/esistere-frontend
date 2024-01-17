import React from 'react';
import ElementoDatiToDoList from './ElementoDatiToDoList';

import { ToDoList } from 'app/interfaces/gestione_todolist/ToDoList';

interface ElementoToDoListProps {
  selectedToDoList: ToDoList;
  index: number;

  onToDoListClick?: (toDoList: ToDoList) => void;
}

const ElementoToDoList: React.FC<ElementoToDoListProps> = ({
  selectedToDoList,
  index,
  onToDoListClick,
}) => {
  const handleClick = (): void => {
    if (onToDoListClick) {
      onToDoListClick(selectedToDoList);
    }
  };
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <h2>Attività della ToDoList</h2>
      <p style={{ fontWeight: 'bold' }}>{`ToDoList ${index}`}</p>
    </div>
  );
};

export default ElementoToDoList;
