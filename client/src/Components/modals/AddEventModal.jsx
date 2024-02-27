import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../Form';
import { Box } from '@mui/material';
import { EventContext } from '../../contexts/event.context';
import {
  handleNumOfGuestsIncrement,
  handleNumOfGuestsDecrement,
  handlePriceOfGuestIncrement,
  handlePriceOfGuestDecrement,
} from '../utilities/eventUtilities';
import Header from '../Header';

import RoomSelectionModal from './RoomSelectionModal';
import DiscountPanel from '../DiscountPanel';

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const {
    title,
    setTitle,
    start,
    setStart,
    end,
    setEnd,
    phone,
    setPhone,
    numOfGuests,
    setNumOfGuests,
    priceOfGuest,
    setPriceOfGuest,
    price,
    setPrice,
    room,
    setRoom,
    color,
    setColor,
    setModalOpen,
    daysDifference,
    setDaysDifference,
    setOverlay,
    total,
    openRoomSelectionModal,
    roomSelection,
  } = useContext(EventContext);

  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    const totalPrice = total * daysDifference;
    setPrice(totalPrice.toFixed(2));
  }, [numOfGuests, priceOfGuest, total, daysDifference]);

  const onSubmit = (event) => {
    onEventAdded({
      start,
      end,
      title,
      phone,
      numOfGuests,
      priceOfGuest,
      price,
      room,
      color,
    });
    onClose();
  };

  const {
    formState: { errors },
  } = useForm();

  return (
    <>
      {isOpen && (
        <div className="modal">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: 1,
              paddingRight: 2,
              '@media (max-width:640px)': {
                width: '150px',
              },
            }}
            mr={2}
          >
            <Header
              modalName={'Dodaj Wydarzenie'}
              setModalOpen={setModalOpen}
              setOverlay={setOverlay}
            />
            <Form
              title={title}
              setTitle={setTitle}
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
              phone={phone}
              setPhone={setPhone}
              numOfGuests={numOfGuests}
              setNumOfGuests={setNumOfGuests}
              priceOfGuest={priceOfGuest}
              setPriceOfGuest={setPriceOfGuest}
              price={price}
              setPrice={setPrice}
              room={room}
              setRoom={setRoom}
              setColor={setColor}
              total={total}
              setSelectedRoom={setSelectedRoom}
              handleNumOfGuestsIncrement={handleNumOfGuestsIncrement}
              handleNumOfGuestsDecrement={handleNumOfGuestsDecrement}
              handlePriceOfGuestIncrement={handlePriceOfGuestIncrement}
              handlePriceOfGuestDecrement={handlePriceOfGuestDecrement}
              onSubmit={onSubmit}
              errors={errors}
              daysDifference={daysDifference}
              setDaysDifference={setDaysDifference}
              roomSelection={roomSelection}
            ></Form>
          </Box>

          <DiscountPanel />
          {openRoomSelectionModal && <RoomSelectionModal />}
        </div>
      )}
    </>
  );
};

export default AddEventModal;
