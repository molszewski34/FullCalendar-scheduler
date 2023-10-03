import React from 'react';

const RoomSelection = ({
  room,
  error,
  setRoom,
  setColor,
  setNumOfGuests,
  setPriceOfGuest,
  setSelectedRoom,
}) => {
  const roomsList = [
    {
      name: 'Sypialnia',
      numOfGuests: 2,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #ED213A, #93291E)`,
    },
    {
      name: '3 łóżka',
      numOfGuests: 3,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #005C97, #363795)`,
    },
    {
      name: '2 łóżka',
      numOfGuests: 2,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #3CA55C, #B5AC49)`,
    },
  ];

  const handleRoomChange = (roomItem) => {
    setRoom(roomItem.name);
    setColor(roomItem.color);
    setNumOfGuests(roomItem.numOfGuests);
    setPriceOfGuest(roomItem.priceOfGuest);
    setSelectedRoom(roomItem.name);
  };

  return (
    <div>
      <label>Wybierz pokój</label>
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
              }}
            >
              {roomItem.name}
            </button>
          ))}
        </div>
        {room === '' && <p className="error">Nie wybrano pokoju</p>}
      </div>
    </div>
  );
};

export default RoomSelection;
