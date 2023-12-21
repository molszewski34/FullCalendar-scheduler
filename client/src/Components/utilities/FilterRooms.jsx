import React, { useContext } from 'react';
import { EventContext } from '../../contexts/event.context';

export function FilterRooms() {
  const { setSelectedCategory, roomsList } = useContext(EventContext);

  return (
    <div>
      <label htmlFor="">Filtrowanie pokoi:</label>
      <select
        style={{
          padding: '.8em',
          margin: '1em',
          backgroundColor: '#fff',
          border: 'solid 1px lightgray ',
        }}
        name="roomSelection"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Wszystkie</option>
        {roomsList.map((room, index) => {
          return (
            <>
              <option
                key={index}
                value={room.name}
                style={{
                  color: room.color, // Kolor tekstu
                  backgroundColor: room.color, // Kolor tła
                }}
              >
                {room.name}
              </option>
            </>
          );
        })}
      </select>
      {/* {roomsList.map((room, index) => {
        return <button style={{ background: room.color }}>test</button>;
      })} */}
    </div>
  );
}
