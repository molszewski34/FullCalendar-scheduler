import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from '../TitleInput';
import PhoneInput from '../PhoneInput';
import DateTimeInputs from '../DateTimeInputs';
import GuestsAndPriceInputs from '../GuestsAndPriceInputs';
import RoomSelection from '../RoomSelection';
import Header from '../Header';
import { Button, Box } from '@mui/material';
import { EventContext } from '../../contexts/event.context';
import DiscountPanel from '../DiscountPanel';
import RoomSelectionModal from './RoomSelectionModal';
const EditEventModal = ({ setEditModalOpen, handleEventChange }) => {
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
    setOverlay,
    daysDifference,
    setDaysDifference,
    setOpen,
    guestsFee,
    total,
    setTotal,
    setModalOpen,
    openRoomSelectionModal,
    editModalOpen,
    setRoomId,
    rooms,
    roomSelection,
    setDestinationRoomId,
  } = useContext(EventContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editModalOpen && editedEvent?._def?.extendedProps?.room) {
      const roomName = editedEvent._def.extendedProps.room;
      const foundRoom = rooms.find((room) => room.roomName === roomName);

      if (foundRoom) {
        setRoomId(foundRoom._id);
        // setRoomId('z EditEventModal');
        setDestinationRoomId(foundRoom._id);
      }
    }
  }, [editModalOpen]);

  useEffect(() => {
    if (editModalOpen) {
      const sum = guestsFee.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setTotal(sum);
      const totalPrice = total * numOfGuests;
      setPrice(totalPrice.toFixed(2));
    }
  }, []);

  return (
    <div>
      {editModalOpen && (
        <div className="modal-edit">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: 1,
              paddingRight: 2,
            }}
            mr={2}
          >
            <Header
              setEditModalOpen={setEditModalOpen}
              setModalOpen={setModalOpen}
              setOverlay={setOverlay}
              modalName={'Edytuj wydarzenie'}
            />
            <form onSubmit={handleSubmit(handleEventChange)}>
              <TitleInput
                title={title}
                setTitle={setTitle}
                editedEvent={editedEvent}
                error={errors.title ? errors.title.message : ''}
                control={control}
                errors={errors}
              />
              <DateTimeInputs
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
                editedEvent={editedEvent}
                daysDifference={daysDifference}
                setDaysDifference={setDaysDifference}
              />
              <PhoneInput
                phone={phone}
                setPhone={setPhone}
                editedEvent={editedEvent}
                error={errors.phone ? errors.phone.message : ''}
                control={control}
                errors={errors}
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

              <div className="price-per-day ">
                Za dzień: <span>{total}zł </span>
              </div>
              <div
                className="price"
                style={{ fontSize: price.length > 6 ? '.8em' : '' }}
              >
                Do zapłaty: <span>{price}zł </span>
              </div>
              <div className="modal-edit_btn-wrapper">
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor:
                      title == '' || phone == '' ? '#d1d5db' : '#16a34a',
                  }}
                  type="submit"
                  disabled={title === '' || phone === ''}
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
          </Box>
          <DiscountPanel />

          {openRoomSelectionModal && <RoomSelectionModal />}
        </div>
      )}
    </div>
  );
};

export default EditEventModal;
