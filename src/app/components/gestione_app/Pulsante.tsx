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
  const testoNonH = tipologia === 'chiaro' ? '#601E9E' : '#ffffff';
  const sfondoH = tipologia === 'chiaro' ? '#b2a1c7' : '#601E9E';
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
      variant="contained"
      style={{
        color: isHover ? testoH : testoNonH,
        backgroundColor: isHover ? sfondoH : sfondoNonH,
        marginTop: '1.5em',
        marginBottom: '1em',
        boxSizing: 'border-box',
      }}
      sx={{ mt: 3, mb: 2 }}
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
