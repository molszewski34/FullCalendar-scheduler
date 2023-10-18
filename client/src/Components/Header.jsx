import React from 'react';
import { Button } from '@mui/material';
const Header = ({ setEditModalOpen, setOverlay }) => {
  return (
    <header className="">
      <Button
        variant="contained"
        color="info"
        className="modal-edit-cancel"
        onClick={() => {
          setEditModalOpen(false);
          setOverlay(false);
        }}
      >
        Anuluj
      </Button>
      <h2>Edytuj wydarzenie</h2>
    </header>
  );
};

export default Header;
