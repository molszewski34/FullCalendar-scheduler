import React, { useContext } from 'react';
import { EventContext } from '../contexts/event.context';
import { useForm, Controller } from 'react-hook-form';

const RoomSelection = ({
  room,
  error,
  setRoom,
  setColor,
  setNumOfGuests,
  setPriceOfGuest,
  setSelectedRoom,
}) => {
  const { setGuestsFee, setTotal, roomsList } = useContext(EventContext);

  const { handleSubmit, control, setError } = useForm();

  console.log(roomsList);

  const handleRoomChange = (roomItem) => {
    setRoom(roomItem.name);
    setColor(roomItem.color);
    setNumOfGuests(roomItem.numOfGuests);
    setPriceOfGuest(roomItem.priceOfGuest);
    setSelectedRoom(roomItem.name);
  };

  const generateInputs = (count) => {
    const newInputs = Array.from({ length: count }, () => 65);
    setGuestsFee(newInputs);
    setTotal(newInputs.length * 65);
  };

  return (
    <div>
      <label>Wybór pokoju</label>
      {room === 'default' && <p className="error"> Wybierz 1 pokój</p>}
      <div className="room-selection">
        <div className="room-list">
          {roomsList.map((roomItem, index) => (
            <button
              key={index}
              type="button"
              className={`room-button ${
                room === roomItem.name ? 'selected' : ''
              }`}
              style={{ background: roomItem.color }}
              onClick={() => {
                handleRoomChange(roomItem);

                generateInputs(roomItem.defNumOfGuests);
              }}
            >
              {roomItem.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;
