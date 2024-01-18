import React, { useState, useEffect } from 'react';
import QuizPreliminareControl from 'app/control/gestione_quiz_preliminare/QuizPreliminareControl';
import PazienteControl from 'app/control/gestione_autenticazione/PazienteControl';
import { QuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/QuizPreliminare';
import { DomandaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/DomandaQuizPreliminare';
import { RispostaQuizPreliminare } from 'app/interfaces/gestione_quiz_preliminare/RispostaQuizPreliminare';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import Navbar from '../Navbar';

function CompilaQuiz(): JSX.Element {
  const [quizPreliminare, setQuizPreliminare] =
    useState<DomandaQuizPreliminare[]>();
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

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const pazienteControl = new PazienteControl();
        const data = await pazienteControl.fetchCodicePaziente(Number(id));
        setCodiceFiscale(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quiz preliminari', error);
      }
    };

    fetchData();
  }, []);

  if (!quizPreliminare) {
    return <div>Errore nel caricamento del quiz preliminare</div>;
  }

  return (
    <div>
      {/* Qui inserisci la tua logica per visualizzare e compilare il quiz */}
      {/* Ad esempio, puoi mappare le domande e le risposte */}
      {quizPreliminare.map((domanda: DomandaQuizPreliminare) => (
        <div key={domanda.id}>
          <p>{domanda.domanda}</p>
          {/* Aggiungi la logica per gestire le risposte */}
          <input type="textfield" name={`domanda_${domanda.id}`} />
        </div>
      ))}
    </div>
  );
}

export default CompilaQuiz;
