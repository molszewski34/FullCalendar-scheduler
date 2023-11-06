import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './TitleInput';
import PhoneInput from './PhoneInput';
import DateTimeInputs from './DateTimeInputs';
import GuestsAndPriceInputs from './GuestsAndPriceInputs';
import RoomSelection from './RoomSelection';
import Header from './Header';
import { Button } from '@mui/material';
import { EventContext } from '../contexts/event.context';
const EditEventModal = ({
  editModalOpen,
  setEditModalOpen,
  handleEventChange,
}) => {
  const {
    editedEvent,
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
    room,
    setRoom,
    setColor,
    setSelectedRoom,
    price,
    setPrice,
    setDeleteConfirmationOpen,
    setOverlay,
    setDaysDifference,
    setOpen,
    setModalOpen,
  } = useContext(EventContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const total = numOfGuests * priceOfGuest;
    setPrice(total);
  }, [numOfGuests, priceOfGuest, setPrice]);

  return (
    <div>
      {editModalOpen && (
        <div className="modal-edit">
          <Header setEditModalOpen={setEditModalOpen} setOverlay={setOverlay} />
          <form onSubmit={handleSubmit(handleEventChange)}>
            <TitleInput
              title={title}
              setTitle={setTitle}
              editedEvent={editedEvent}
              error={errors.title ? errors.title.message : ''}
              control={control}
              errors={errors}
            />
            <PhoneInput
              phone={phone}
              setPhone={setPhone}
              editedEvent={editedEvent}
              error={errors.phone ? errors.phone.message : ''}
              control={control}
              errors={errors}
            />
            <DateTimeInputs
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
              editedEvent={editedEvent}
              setDaysDifference={setDaysDifference}
            />
            <RoomSelection
              room={room}
              setRoom={setRoom}
              setColor={setColor}
              setNumOfGuests={setNumOfGuests}
              setPriceOfGuest={setPriceOfGuest}
              setSelectedRoom={setSelectedRoom}
              editedEvent={editedEvent}
              price={setPrice}
              error={errors.rooms ? errors.rooms.message : ''}
              control={control}
              errors={errors}
            />
            <GuestsAndPriceInputs
              numOfGuests={numOfGuests}
              setNumOfGuests={setNumOfGuests}
              priceOfGuest={priceOfGuest}
              setPriceOfGuest={setPriceOfGuest}
              editedEvent={editedEvent}
            />
            <div className="price">
              Do zapłaty: <span>{price}zł </span>
            </div>
            <div className="modal-edit_btn-wrapper">
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: '#16a34a' }}
                type="submit"
              >
                Zapisz
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={() => {
                  setOpen(true);
                  setEditModalOpen(false);
                }}
              >
                Usuń
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditEventModal;
