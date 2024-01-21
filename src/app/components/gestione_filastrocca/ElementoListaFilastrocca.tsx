import React from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import { Filastrocca } from 'app/interfaces/gestione_filastrocche/Filastrocca';

interface ElementoListaFilastroccaProps {
  filastrocca: Filastrocca;
  onFilastroccaClick: (filastrocca: Filastrocca) => void;
}

const ElementoListaFilastrocca: React.FC<ElementoListaFilastroccaProps> = ({
  filastrocca,
  onFilastroccaClick,
}) => {
  const handleClick = (): void => {
    onFilastroccaClick(filastrocca);
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
      <p style={{ fontWeight: 'bold' }}>{filastrocca.titolo}</p>
    </div>
  );
};
export default ElementoListaFilastrocca;
