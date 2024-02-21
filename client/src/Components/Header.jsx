import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../contexts/event.context';

const Header = ({ modalName }) => {
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
    setTotal,
    setPrice,
    setOpenRoomSelectionModal,
    setRoomSelection,
    setDestinationRoomId,
    setModalOpen,
  } = useContext(EventContext);

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
          setOpenRoomSelectionModal(false);
          setTitle('');
          setGuestsFee([65]);
          setStart(null);
          setEnd(null);
          setPhone('');
          setPriceOfGuest(65);
          setNumOfGuests(0);
          setRoom('Wybierz pokój');
          setTotal(0);
          setPrice(0);
          setColor('');
          setRoomSelection('');
          setDestinationRoomId('');
        }}
      >
        Anuluj
      </Button>
      <h2>{modalName}</h2>
    </header>
  );
};

export default Header;
