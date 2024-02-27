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
    phone,
    numOfGuests,
    price,
    setPrice,
    setOpen,
    guestsFee,
    total,
    setTotal,
    openRoomSelectionModal,
    editModalOpen,
    setRoomId,
    rooms,
    setDestinationRoomId,
    setTitle,
    setPhone,
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
  }, [editModalOpen]);

  return (
    <div>
      {editModalOpen && (
        <div className="modal">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: 1,
              paddingRight: 2,
            }}
            mr={2}
          >
            <Header modalName={'Edytuj wydarzenie'} />
            <form onSubmit={handleSubmit(handleEventChange)}>
              <TitleInput
                title={title}
                setTitle={setTitle}
                editedEvent={editedEvent}
                error={errors.title ? errors.title.message : ''}
                control={control}
                errors={errors}
              />
              <DateTimeInputs />
              <PhoneInput
                phone={phone}
                setPhone={setPhone}
                editedEvent={editedEvent}
                error={errors.phone ? errors.phone.message : ''}
                control={control}
                errors={errors}
              />
              <RoomSelection />
              <GuestsAndPriceInputs />

              <div className="price-per-day ">
                Za dzień: <span>{total}zł </span>
              </div>
              <div
                className="price"
                style={{ fontSize: price.length > 6 ? '.8em' : '' }}
              >
                Do zapłaty: <span>{price}zł </span>
              </div>
              <div className="modal_btn-wrapper">
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
