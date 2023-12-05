import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../contexts/event.context';
const Header = () => {
  const { setEditModalOpen, setGuestsFee, setOverlay } =
    useContext(EventContext);
  return (
    <header className="">
      <Button
        variant="contained"
        color="info"
        className="modal-edit-cancel"
        onClick={() => {
          setEditModalOpen(false);
          setOverlay(false);
          setGuestsFee([65]);
        }}
      >
        Anuluj
      </Button>
      <h2>Edytuj wydarzenie</h2>
    </header>
  );
};

export default Header;
