import React from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './TitleInput';
import PhoneInput from './PhoneInput';
import GuestsAndPriceInputs from './GuestsAndPriceInputs';
import RoomSelection from './RoomSelection';
import DateTimeInputs from './DateTimeInputs';
import { Button } from '@mui/material';
const Form = ({
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
  room,
  setRoom,
  setColor,
  setSelectedRoom,
  setPrice,
  onSubmit,
  setDaysDifference,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleInput
        title={title}
        setTitle={setTitle}
        error={errors.title ? errors.title.message : ''}
        control={control}
        errors={errors}
      />

      <DateTimeInputs
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        setDaysDifference={setDaysDifference}
      />
      <PhoneInput
        phone={phone}
        setPhone={setPhone}
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
      />

      <div className="price">
        Do zapłaty: <span>{price}zł </span>
      </div>

      <Button
        variant="contained"
        color="success"
        size="large"
        className="form-submit"
        type="submit"
      >
        Zapisz
      </Button>
    </form>
  );
};

export default Form;
