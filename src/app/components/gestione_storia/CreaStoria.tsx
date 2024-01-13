import React from 'react';
import 'app/css/gestione_app/FormElements.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function CreaStoria(): JSX.Element {
  const [isHovered, setIsHovered] = React.useState(false);

  const gestisciHover = (hovered: boolean): void => {
    setIsHovered(hovered);
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const nomeFile = event.target.files?.[0]?.name;
    console.log('Nome del file:', nomeFile);
  };

  return (
    <>
      <form className="formflex">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="riga">
            <TextField
              required
              fullWidth
              id="outlined-multiline-storia"
              label="Testo Storia"
              multiline
              rows={10}
            />
          </div>
          <div className="riga">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onMouseEnter={() => gestisciHover(true)}
              onMouseLeave={() => gestisciHover(false)}
              style={{
                backgroundColor: isHovered ? '#8036a1' : '#9149f3',
                color: '#ffffff',
                margin: '1em',
              }}
            >
              Carica file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </div>
          <div className="riga">
            <TextField
              required
              fullWidth
              id="outlined-multiline-descrizione"
              label="Descrizione File"
              multiline
              rows={10}
            />
          </div>
        </Box>
      </form>
    </>
  );
}

export default CreaStoria;
