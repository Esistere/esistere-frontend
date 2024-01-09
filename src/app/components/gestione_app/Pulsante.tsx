import Button from '@mui/material/Button';
import React, { useState, MouseEvent } from 'react';

interface PulsanteProps {
  tipologia: 'chiaro' | 'scuro';
  testo: string;
  nome: string;
  inizio?: React.ReactNode;
  fine?: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Pulsante({
  tipologia,
  testo,
  nome,
  inizio,
  fine,
  onClick,
}: PulsanteProps): JSX.Element {
  const testoH = '#ffffff';
  const testoNonH = tipologia === 'chiaro' ? '#8036a1' : '#ffffff';
  const sfondoH = tipologia === 'chiaro' ? '#b2a1c7' : '#8036a1';
  const sfondoNonH = tipologia === 'chiaro' ? '#ffffff' : '#9149f3';
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = (): void => {
    setIsHover(true);
  };

  const handleMouseLeave = (): void => {
    setIsHover(false);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <Button
      style={{
        color: isHover ? testoH : testoNonH,
        borderColor: '#000000',
        backgroundColor: isHover ? sfondoH : sfondoNonH,
        margin: '1em',
        boxSizing: 'border-box',
      }}
      id={nome}
      startIcon={inizio}
      endIcon={fine}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {testo}
    </Button>
  );
}

export default Pulsante;
