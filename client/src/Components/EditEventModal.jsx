import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './TitleInput';
import PhoneInput from './PhoneInput';
import DateTimeInputs from './DateTimeInputs';
import GuestsAndPriceInputs from './GuestsAndPriceInputs';
import RoomSelection from './RoomSelection';
import Header from './Header';
import { Button, Box } from '@mui/material';
import { EventContext } from '../contexts/event.context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
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
    guestsFee,
    setGuestsFee,
    total,
    setTotal,
    initialInputs,
    setInitialInputs,
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

  // const handleInputChange = (index, value) => {
  //   const newInputs = [...guestsFee];

  //   const diff = value - newInputs[index];
  //   newInputs[index] = value;
  //   setGuestsFee(newInputs);
  //   setInitialInputs(newInputs);
  //   setTotal(total + diff);
  // };

  const handleInputChange = (index, value) => {
    const newValue = parseInt(value) || 0; // Parse value to integer or set to 0 if NaN
    const newInputs = [...guestsFee];

    const diff = newValue - newInputs[index];
    newInputs[index] = newValue;
    setGuestsFee(newInputs);
    setInitialInputs(newInputs);
    setTotal(total + diff);
  };

  const incrementValue = (index) => {
    const newInputs = [...guestsFee];
    newInputs[index] += 1;
    setGuestsFee(newInputs);
    setInitialInputs(newInputs);
    setTotal(total + 1);
  };

  const decrementValue = (index) => {
    const newInputs = [...guestsFee];
    newInputs[index] -= 1;
    setGuestsFee(newInputs);
    setInitialInputs(newInputs);
    setTotal(total - 1);
  };

  const changeValuePercentage = (index, percentage) => {
    if (guestsFee === initialInputs) {
      const newInputs = [...guestsFee];
      const newValue = newInputs[index] * (1 + percentage / 100);
      const diff = newValue - newInputs[index];
      newInputs[index] = newValue;
      setGuestsFee(newInputs);
      setTotal(total + diff);
    } else {
      const initialValue = [...initialInputs];
      const newInputs = [...guestsFee];
      const newValue = initialValue[index] * (1 + percentage / 100);
      const diff = newValue - newInputs[index];
      newInputs[index] = newValue;
      setGuestsFee(newInputs);
      setTotal(total + diff);
    }
  };

  // console.log(guestsFee);

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
              setOverlay={setOverlay}
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

              <div className="price-per-day ">
                Za dzień: <span>{total}zł </span>
              </div>
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
          </Box>
          <div>
            {guestsFee.map((value, index) => (
              <div className="discount-box">
                <div className="discount-box-wrapper">
                  <div className="discount-box-item" key={index}>
                    <input
                      key={index}
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleInputChange(index, parseInt(e.target.value))
                      }
                    />
                    <div className="discount-box-item-btns">
                      <RemoveCircleOutlineIcon
                        fontSize="large"
                        type="button"
                        onClick={() => decrementValue(index)}
                        color="warning"
                      />
                      <AddCircleOutlineIcon
                        fontSize="large"
                        type="button"
                        onClick={() => incrementValue(index)}
                        color="success"
                      />
                    </div>
                  </div>
                  <div className="discount-btns ">
                    <Button
                      variant="contained"
                      color="secondary"
                      className="discount-btn"
                      sx={{ my: 1 }}
                      size="small"
                      onClick={() => changeValuePercentage(index, -50)}
                    >
                      50%
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="discount-btn"
                      sx={{ my: 1 }}
                      size="small"
                      onClick={() => changeValuePercentage(index, -25)}
                    >
                      25%
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="discount-btn"
                      sx={{ my: 1 }}
                      size="small"
                      // onClick={() => handleReduceValueBy50Percent(index)}
                      onClick={() => changeValuePercentage(index, -10)}
                    >
                      10%
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEventModal;
