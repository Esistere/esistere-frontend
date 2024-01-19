import React from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';

interface ElementoListaQuizAllenamentoGiornalieroProps {
  index: number;
  quizAllenamentoGiornaliero: QuizAllenamentoGiornaliero;
  onQuizAllenamentoGiornalieroClick: (
    quizAllenamentoGiornaliero: QuizAllenamentoGiornaliero
  ) => void;
}

const ElementoListaQuizAllenamentoGiornaliero: React.FC<
  ElementoListaQuizAllenamentoGiornalieroProps
> = ({
  index,
  quizAllenamentoGiornaliero,
  onQuizAllenamentoGiornalieroClick,
}) => {
  const handleClick = (): void => {
    onQuizAllenamentoGiornalieroClick(quizAllenamentoGiornaliero);
  };
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '20em',
      }}
      onClick={handleClick}
    >
      <h2>Quiz {index}</h2>
    </div>
  );
};

export default ElementoListaQuizAllenamentoGiornaliero;
