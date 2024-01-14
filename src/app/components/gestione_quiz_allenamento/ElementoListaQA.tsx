import React from 'react';
import 'app/css/gestione_app/ElementoLista.css';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';

interface ElementoListaQuizAllenamentoGiornalieroProps {
  quizAllenamentoGiornaliero: QuizAllenamentoGiornaliero;
  onQuizAllenamentoGiornalieroClick: (
    quizAllenamentoGiornaliero: QuizAllenamentoGiornaliero
  ) => void;
}

const ElementoListaQuizAllenamentoGiornaliero: React.FC<
  ElementoListaQuizAllenamentoGiornalieroProps
> = ({ quizAllenamentoGiornaliero, onQuizAllenamentoGiornalieroClick }) => {
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
      }}
      onClick={handleClick}
    >
      <p style={{ fontWeight: 'bold' }}>{quizAllenamentoGiornaliero.id}</p>
    </div>
  );
};

export default ElementoListaQuizAllenamentoGiornaliero;
