import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../contexts/event.context';
const Header = () => {
  const {
    setEditModalOpen,
    setGuestsFee,
    setOverlay,
    setTitle,
    setPhone,
    setPriceOfGuest,
    setNumOfGuests,

    setRoom,
    setColor,
  } = useContext(EventContext);
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
          setTitle('');
          setPhone('');
          setPriceOfGuest('');
          setNumOfGuests('');

          setRoom('');
          setColor('');
        }}
      >
        Anuluj
      </Button>
      <h2>Edytuj wydarzenie</h2>
    </header>
  );
};

export default Header;
