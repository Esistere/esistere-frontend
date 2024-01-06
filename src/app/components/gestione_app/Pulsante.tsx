import Button from '@mui/material/Button';
import React, { MouseEventHandler, useState } from 'react';

function Pulsante(
  tipologia: string, //chiaro o scuro per leggibilità
  testo: string,
  nome: string,
  inizio?: React.ReactNode | undefined,
  fine?: React.ReactNode | undefined,
  click?: MouseEventHandler<HTMLButtonElement> | undefined
): JSX.Element {
  const testoH = '#ffffff';
  const testoNonH = tipologia === 'chiaro' ? '#8036a1' : '#ffffff';
  const sfondoH = tipologia === 'chiaro' ? '#b2a1c7' : '#8036a1';
  const sfondoNonH = tipologia === 'chiaro' ? '#ffffff' : '#9149f3';
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <Button
      style={{
        color: isHover ? testoH : testoNonH,
        borderColor: '#000000',
        backgroundColor: isHover ? sfondoH : sfondoNonH,
        width: '16.15em',
        margin: '1em',
        boxSizing: 'border-box',
      }}
      id={nome}
      startIcon={inizio}
      endIcon={fine}
      onClick={click}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {testo}
    </Button>
  );
}

export default Pulsante;
