import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
const ButtonSubmit = () => {
  return (
    <Button
      variant="contained"
      size="large"
      type="submit"
      style={{
        marginLeft: '.2em',
        marginTop: '1em',
        backgroundColor: '#0ea5e9',
        display: 'flex',
        alignItems: 'center',
      }}
      endIcon={<EditIcon />}
    >
      Edytuj
    </Button>
  );
};

export default ButtonSubmit;
