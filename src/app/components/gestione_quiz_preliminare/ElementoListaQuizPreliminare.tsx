import React from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';

interface ElementoListaQuizPreliminareProps {
  quizPreliminare: QuizPreliminare;
  onQuizPreliminareClick: (quizPreliminare: QuizPreliminare) => void;
}

const ElementoListaQuizPreliminare: React.FC<
  ElementoListaQuizPreliminareProps
> = ({ quizPreliminare, onQuizPreliminareClick }) => {
  const handleClick = (): void => {
    onQuizPreliminareClick(quizPreliminare);
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
      <p style={{ fontWeight: 'bold' }}>{quizPreliminare.id}</p>
    </div>
  );
};

export default ElementoListaQuizPreliminare;
