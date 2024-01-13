import React, { useState, MouseEvent } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface PulsanteProps extends ButtonProps {
  tipologia: 'chiaro' | 'scuro';
  testo: string;
  nome: string;
  inizio?: React.ReactNode;
  fine?: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Pulsante: React.FC<PulsanteProps> = ({
  tipologia,
  testo,
  nome,
  inizio,
  fine,
  onClick,
  ...otherProps
}) => {
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
      {...otherProps}
      variant="contained"
      style={{
        color: isHover ? testoH : testoNonH,
        backgroundColor: isHover ? sfondoH : sfondoNonH,
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
};

export default Pulsante;
