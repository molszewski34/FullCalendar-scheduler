import React from 'react';
import DateTime from 'react-datetime';
import { useForm } from 'react-hook-form';
import TitleInput from './TitleInput';
import { ArrivalDateTimeInput, DepartureDateTimeInput } from './DateTimeInputs';
import PhoneInput from './PhoneInput';
import GuestsAndPriceInputs, { GuestsInput } from './GuestsAndPriceInputs';
import RoomSelection from './RoomSelection';

const UserDataForm = ({
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
  handleNumOfGuestsIncrement,
  handleNumOfGuestsDecrement,
  handlePriceOfGuestIncrement,
  handlePriceOfGuestDecrement,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleInput title={title} setTitle={setTitle} />
      <ArrivalDateTimeInput start={start} setStart={setStart} />
      <DepartureDateTimeInput end={end} setEnd={setEnd} />
      <PhoneInput phone={phone} setPhone={setPhone} />
      <GuestsAndPriceInputs
        numOfGuests={numOfGuests}
        setNumOfGuests={setNumOfGuests}
        handleNumOfGuestsIncrement={handleNumOfGuestsIncrement}
        handleNumOfGuestsDecrement={handleNumOfGuestsDecrement}
        priceOfGuest={priceOfGuest}
        setPriceOfGuest={setPriceOfGuest}
        handlePriceOfGuestIncrement={handlePriceOfGuestIncrement}
        handlePriceOfGuestDecrement={handlePriceOfGuestDecrement}
      />
      <RoomSelection
        // roomsList={roomsList}
        room={room}
        setRoom={setRoom}
        setColor={setColor}
        setNumOfGuests={setNumOfGuests}
        setPriceOfGuest={setPriceOfGuest}
        setSelectedRoom={setSelectedRoom}
      />

      <div className="">{`Do zapłaty: ${price} zł`}</div>

      <button type="submit">Add event</button>
    </form>
  );
};

export default UserDataForm;
