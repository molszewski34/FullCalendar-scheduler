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
  // priceOfGuest,
  // setButtonCount,
}) => {
  const {
    setButtonCount,
    buttonCount,
    setInputValues,
    priceOfGuest,
    setGuestsFee,
    setTotal,
  } = useContext(EventContext);

  const { handleSubmit, control, setError } = useForm();

  const roomsList = [
    {
      name: 'Sypialnia',
      numOfGuests: 2,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #ED213A, #93291E)`,
      generateInput: () => generateInputs(2),
    },
    {
      name: '3 łóżka',
      numOfGuests: 3,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #005C97, #363795)`,
      generateInput: () => generateInputs(3),
    },
    {
      name: '2 łóżka',
      numOfGuests: 2,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #3CA55C, #B5AC49)`,
      generateInput: () => generateInputs(2),
    },
  ];

  const handleRoomChange = (roomItem) => {
    setRoom(roomItem.name);
    setColor(roomItem.color);
    setNumOfGuests(roomItem.numOfGuests);
    setPriceOfGuest(roomItem.priceOfGuest);
    setSelectedRoom(roomItem.name);
    // setInputValues(new Array(roomItem.numOfGuests).fill(priceOfGuest));
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
                roomItem.generateInput();
              }}
            >
              {roomItem.name}
            </button>
          ))}
          {/* <div>
            <button onClick={() => generateInputs(1)}>Generuj 1 Input</button>
            <button onClick={() => generateInputs(3)}>Generuj 3 Inputy</button>
            <button onClick={() => generateInputs(5)}>Generuj 5 Inputów</button>
           
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;
