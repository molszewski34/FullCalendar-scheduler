import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Form from './Form';
import { Button } from '@mui/material';
import { EventContext } from '../contexts/event.context';
import {
  handleNumOfGuestsIncrement,
  handleNumOfGuestsDecrement,
  handlePriceOfGuestIncrement,
  handlePriceOfGuestDecrement,
} from './utilities/eventUtilities';
import Header from './Header';
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
    setDaysDifference,
    setOverlay,
  } = useContext(EventContext);

  const [selectedRoom, setSelectedRoom] = useState('');
  const roomsList = [
    { name: 'Sypialnia', numOfGuests: 2, priceOfGuest: 65, color: 'red' },
    { name: '3 łóżka', numOfGuests: 3, priceOfGuest: 65, color: 'blue' },
    { name: '2 łóżka', numOfGuests: 2, priceOfGuest: 65, color: 'green' },
  ];
  useEffect(() => {
    const total = numOfGuests * priceOfGuest;
    setPrice(total);
  }, [numOfGuests, priceOfGuest]);

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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {isOpen && (
        <div className="modal-edit">
          <header className="">
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setModalOpen(false);
                setOverlay(false);
              }}
            >
              Anuluj
            </Button>
            <h2>Dodaj wydarzenie</h2>
          </header>

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
            setSelectedRoom={setSelectedRoom}
            handleNumOfGuestsIncrement={handleNumOfGuestsIncrement}
            handleNumOfGuestsDecrement={handleNumOfGuestsDecrement}
            handlePriceOfGuestIncrement={handlePriceOfGuestIncrement}
            handlePriceOfGuestDecrement={handlePriceOfGuestDecrement}
            onSubmit={onSubmit}
            errors={errors}
            setDaysDifference={setDaysDifference}
          ></Form>
        </div>
      )}
    </>
  );
};

export default AddEventModal;
