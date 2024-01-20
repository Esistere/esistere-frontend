import { Button, Card, CardContent, Typography } from '@mui/material';
import { DomandaRisposta } from 'app/interfaces/gestione_quiz_allenamento/DomandaRisposta';
import React, { useState } from 'react';
import SalvaRisposte from './SalvaRisposte';

interface CardDomandaProps {
  domRis: DomandaRisposta[];
  salvaRisposte: SalvaRisposte;
  mostra: number;
}

function CardDomanda({
  domRis,
  salvaRisposte,
  mostra,
}: CardDomandaProps): JSX.Element {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number>>([]);

  const handleClick = (
    domIndex: number,
    index: number,
    domRes: DomandaRisposta
  ): void => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[domIndex] = index;
    setSelectedAnswers(updatedSelectedAnswers);

    domRes.risposte.forEach((risposta, i) => {
      risposta.selezionata = i === index;
      console.log(risposta.selezionata, risposta);
      salvaRisposte.addRisposta({
        id: risposta.idRisposta,
        domanda_ag: Number(risposta.domanda_ag),
        risposta: risposta.risposta,
        corretta: risposta.corretta,
        selezionata: risposta.selezionata,
      });
    });
    salvaRisposte.addDomanda({
      id: domRes.idDomanda,
      quiz_ag: Number(domRes.quiz_ag),
      domanda: domRes.domanda,
      corretta: salvaRisposte.getLastCorretta(),
    });
    salvaRisposte.addCont();
  };

  return (
    <>
      {domRis.map((dom, domIndex) => (
        <Card
          key={domIndex}
          style={{
            display: domIndex === mostra ? 'block' : 'none',
            width: '20em',
            alignItems: 'center',
            alignContent: 'center',
            margin: 'auto',
            marginTop: '5em',
            justifyContent: 'center',
          }}
        >
          <CardContent
            style={{
              alignItems: 'center',
              alignContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              style={{
                color: 'blueviolet',
                textAlign: 'center',
                marginBottom: '1em',
              }}
            >
              {dom.domanda}
            </Typography>
            {dom.risposte.map((risposta, index) => (
              <Button
                key={index}
                sx={{
                  alignItems: 'center',
                  alignContent: 'center',
                  marginBottom: '2em',
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  backgroundColor:
                    selectedAnswers[domIndex] === index
                      ? 'blueviolet'
                      : '#ab57ff',
                }}
                variant="contained"
                color="secondary"
                style={{ width: '15em' }}
                disabled={
                  selectedAnswers[domIndex] !== index &&
                  selectedAnswers[domIndex] !== undefined
                }
                onClick={() => handleClick(domIndex, index, dom)}
              >
                {risposta.risposta}
              </Button>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default CardDomanda;
