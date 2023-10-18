import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
const Legend = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      style={{ gap: '.5em' }}
    >
      <Button
        size={'small'}
        variant="contained"
        style={{
          background: 'linear-gradient(to right, #ED213A, #93291E)',
          fontWeight: 'bold',
        }}
      >
        Sypialnia
      </Button>
      <Button
        size={'small'}
        variant="contained"
        style={{
          background: 'linear-gradient(to right, #005C97, #363795)',
          fontWeight: 'bold',
        }}
      >
        3 łóżka
      </Button>
      <Button
        size={'small'}
        variant="contained"
        style={{
          background: 'linear-gradient(to right, #3CA55C, #B5AC49)',
          fontWeight: 'bold',
        }}
      >
        2 łóżka
      </Button>
    </Box>
  );
};

export default Legend;
