import React, { useState, useEffect } from 'react';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import { DomandaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/DomandaQuizPreliminare';
import { useLocation } from 'react-router-dom';

function CompilaQuiz(): JSX.Element {
  const [quizPreliminare, setQuizPreliminare] =
    useState<DomandaQuizPreliminare[]>();
  // TODO remove
  /* eslint-disable */
  const [codiceFiscale, setCodiceFiscale] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const id = location.state;

  const fetchData = async (): Promise<void> => {
    try {
      const quizPreliminareControl = new QuizPreliminareControl();
      const data = await quizPreliminareControl.fetchDomandeQuizPreliminare(
        Number(id)
      );
      setQuizPreliminare(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quiz preliminari', error);
    }
  };
  // TODO remove
  /* eslint-enable */

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const pazienteControl = new PazienteControl();
        const data = await pazienteControl.fetchCodicePaziente(Number(id));
        setCodiceFiscale(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching codice_fiscale', error);
      }
    };

    fetchData();
  }, [id]);

  if (!quizPreliminare) {
    return <div>Errore nel caricamento del quiz preliminare</div>;
  }

  return (
    <div>
      {quizPreliminare.map((domanda: DomandaQuizPreliminare) => (
        <div key={domanda.id}>
          <p>{domanda.domanda}</p>
          <input type="textfield" name={`domanda_${domanda.id}`} />
        </div>
      ))}
    </div>
  );
}

export default CompilaQuiz;
