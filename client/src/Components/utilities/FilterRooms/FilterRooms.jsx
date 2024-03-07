import React, { useContext } from 'react';
import { EventContext } from '../../../contexts/event.context';
import './index.css';
export function FilterRooms() {
  const { setSelectedCategory, rooms } = useContext(EventContext);

  return (
    <div className="filter-rooms">
      <select
        style={{
          padding: '.8em',
          margin: '1em',
          backgroundColor: '#fff',
          border: 'solid 1px lightgray ',
          borderRadius: '3px',
        }}
        name="roomSelection"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Pokoje</option>
        {rooms.map((room, index) => {
          let displayName = room.roomName;
          if (displayName.length > 12) {
            displayName = displayName.substring(0, 12) + '...';
          }
          return (
            <option key={index} value={room.roomName}>
              {displayName}
            </option>
          );
        })}
      </select>
    </div>
  );
}
