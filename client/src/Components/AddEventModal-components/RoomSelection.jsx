import React from 'react';
import { useForm } from 'react-hook-form';

const RoomSelection = ({
  // roomsList,
  room,
  setRoom,
  setColor,
  setNumOfGuests,
  setPriceOfGuest,
  setSelectedRoom,
}) => {
  console.log(room);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const roomsList = [
    { name: 'Sypialnia', numOfGuests: 2, priceOfGuest: 65, color: 'red' },
    { name: '3 łóżka', numOfGuests: 3, priceOfGuest: 65, color: 'blue' },
    { name: '2 łóżka', numOfGuests: 2, priceOfGuest: 65, color: 'green' },
  ];
  return (
    <div>
      <header>Wybierz pokój</header>
      <div className="">
        {roomsList.map((roomItem, index) => (
          <button
            type="button"
            className={`room-button ${
              room === roomItem.name ? 'selected' : ''
            }`}
            style={{ backgroundColor: roomItem.color }}
            key={index}
            onClick={() => {
              setRoom(roomItem.name);
              setColor(roomItem.color);
              setNumOfGuests(roomItem.numOfGuests);
              setPriceOfGuest(roomItem.priceOfGuest);
              setSelectedRoom(roomItem.name);
            }}
          >
            {roomItem.name}
          </button>
        ))}
      </div>
      {errors.room && <p className="error">Wybierz jeden z pokoi</p>}
    </div>
  );
};

export default RoomSelection;
