import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const ButtonSubmit = () => {
  return (
    <Button
      variant="contained"
      size="large"
      type="submit"
      style={{
        marginLeft: '.2em',
        marginTop: '1em',
        backgroundColor: '#22c55e',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Dodaj <AddIcon style={{ marginLeft: '.2em' }} />
    </Button>
  );
};

export default ButtonSubmit;
