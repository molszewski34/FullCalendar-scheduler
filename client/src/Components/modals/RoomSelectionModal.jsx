import React, { useContext } from 'react';
import { EventContext } from '../../contexts/event.context';
import CloseIcon from '@mui/icons-material/Close';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../styles/RoomSelectionModal.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
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
    setDestinationRoomId,
  } = useContext(EventContext);

  const handleRoomButtonClick = (room) => {
    setRoomSelection({ ...room });
    setRoom(room.roomName);
    setPriceOfGuest(room.RoomPriceOfGuest);
    setNumOfGuests(room.roomNumOfGuests);
    setColor(room.roomColor);
    setDestinationRoomId(room._id);
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
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: ' #f1f5f9',
                }}
              >
                <div className="modal-room-selection_info__wrapper">
                  <div className="modal-room-selection_info__top">
                    <span>
                      <LocalHotelIcon />
                      {room.roomNumOfGuests}
                    </span>
                    <span>
                      <AttachMoneyIcon />
                      {room.RoomPriceOfGuest}zł/os
                    </span>
                  </div>
                  {room.roomName}
                  <div className="modal-room-selection_info__bottom">
                    <span>
                      <LocationOnIcon />
                      {room.roomLocation}
                    </span>
                  </div>
                </div>
                <div className="modal-room-selection_info-equipment__wrapper">
                  {room.equipment.map((equipment, index) => (
                    <>
                      <span
                        data-tooltip-id="equipment-tooltip"
                        key={index}
                        className="modal-room-selection_info-equipment__wrapper__icon"
                        data-tooltip-content={equipment.name} // Set tooltip text here
                        data-tooltip-place="top"
                        data-tooltip-variant="success"
                        // data-for={`equipment-tooltip-${index}`}
                        style={{ fontFamily: 'Material Icons' }}
                      >
                        {equipment.icon}
                      </span>
                    </>
                  ))}
                  {/* Define tooltips */}
                </div>
                <Tooltip
                  // key={index}
                  id="equipment-tooltip"
                  // place="top"
                  // effect="solid"
                />
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
