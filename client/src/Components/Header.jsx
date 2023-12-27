import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../contexts/event.context';
const Header = ({ modalName, setModalOpen }) => {
  const {
    setEditModalOpen,
    setOverlay,
    setStart,
    setEnd,
    setTitle,
    setPhone,
    setPriceOfGuest,
    setNumOfGuests,
    setGuestsFee,
    setRoom,
    setColor,
    title,
  } = useContext(EventContext);

  console.log(title);
  return (
    <header className="">
      <Button
        variant="contained"
        color="info"
        className="modal-edit-cancel"
        onClick={() => {
          setEditModalOpen(false);
          setModalOpen(false);
          setOverlay(false);
          setTitle('');
          setGuestsFee([65]);
          setStart(null);
          setEnd(null);
          setPhone('');
          setPriceOfGuest(65);
          setNumOfGuests(2);
          setRoom('default');
          setColor('');
        }}
      >
        Anuluj
      </Button>
      <h2>{modalName}</h2>
    </header>
  );
};

export default Header;
