import React from 'react';

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
      <h2>{`ToDoList ${index + 1}`}</h2>
    </div>
  );
};

export default ElementoToDoList;
