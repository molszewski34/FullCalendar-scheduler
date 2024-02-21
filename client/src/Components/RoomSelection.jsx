import React, { useContext } from 'react';
import { EventContext } from '../contexts/event.context';

const RoomSelection = () => {
  const { setOpenRoomSelectionModal, room } = useContext(EventContext);

  return (
    <div>
      <label>Wybierz pokój</label>
      {room === 'default' && <p className="error"> Wybierz 1 pokój</p>}
      <div className="room-selection">
        <div className="room-list">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenRoomSelectionModal(true);
            }}
            style={{
              border: `2px solid ${
                room != 'Wybierz pokój' ? '#65a30d' : '#000'
              }`,
              background: '#fff',
              color: room != 'Wybierz pokój' ? '#65a30d' : '#000',
            }}
            className="room-button"
          >
            {room}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;
