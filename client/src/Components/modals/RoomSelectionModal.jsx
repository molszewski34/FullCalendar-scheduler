import React, { useContext } from 'react';
import { EventContext } from '../../contexts/event.context';
import CloseIcon from '@mui/icons-material/Close';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../styles/RoomSelectionModal.css';
const RoomSelectionModal = () => {
  const {
    setRoom,
    rooms,
    setOpenRoomSelectionModal,
    setRoomSelection,
    setGuestsFee,
    setInitialInputs,
    setPriceOfGuest,
    setNumOfGuests,
    setTotal,
    setColor,
    setRoomId,
  } = useContext(EventContext);

  const handleRoomButtonClick = (room) => {
    setRoomSelection({ ...room });
    setRoom(room.roomName);
    setPriceOfGuest(room.RoomPriceOfGuest);
    setNumOfGuests(room.roomNumOfGuests);
    setColor(room.roomColor);
    setRoomId(room._id);
  };

  const generateInputs = (count, priceOfGuest) => {
    const newInputs = Array.from({ length: count }, () => priceOfGuest);
    setGuestsFee(newInputs);
    setInitialInputs(newInputs);
    setTotal(newInputs.length * priceOfGuest);
  };

  return (
    <div className="modal-room-selection">
      <div className="modal-room-selection_header">
        <p>Wybierz pokój</p>
        <CloseIcon onClick={() => setOpenRoomSelectionModal(false)} />
      </div>
      <div
        className="modal-room-selection_wrapper"
        style={{
          borderBottom: `${
            (rooms?.length ?? 0) >= 16 ? '1px solid #a1a1aa' : ''
          } `,
          paddingBottom: `${(rooms?.length ?? 0) >= 16 ? '0.8em' : ''} `,
        }}
      >
        {rooms
          ?.reduce((acc, room) => {
            if (!acc[room.roomNumOfGuests]) {
              acc[room.roomNumOfGuests] = [];
            }
            acc[room.roomNumOfGuests].push(
              <button
                key={room._id}
                role="button"
                onClick={(e) => {
                  handleRoomButtonClick(room);
                  setOpenRoomSelectionModal(false);
                  generateInputs(room.roomNumOfGuests, room.RoomPriceOfGuest);
                }}
                style={{
                  borderColor: room.roomColor,
                  marginBottom: '.25em',
                  padding: '1em 0.3em',
                }}
              >
                <div className="modal-room-selection_info__top">
                  <span>
                    <LocalHotelIcon />
                    {room.roomNumOfGuests}
                  </span>
                  <span>
                    <AttachMoneyIcon />
                    {room.RoomPriceOfGuest}zł
                  </span>
                </div>
                {room.roomName}
                <div className="modal-room-selection_info__bottom">
                  <span>
                    <LocationOnIcon />
                    {room.roomLocation}
                  </span>
                </div>
              </button>
            );
            return acc;
          }, [])
          .map((roomGroup, numOfGuests) => (
            <div key={numOfGuests}>
              <header className="modal-room-selection_header">
                {numOfGuests}{' '}
                {numOfGuests === 1
                  ? 'łóżko'
                  : numOfGuests >= 2 && numOfGuests <= 4
                    ? 'łóżka'
                    : 'łóżek'}
              </header>
              {roomGroup}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomSelectionModal;
