import React, { useContext } from 'react';
import { EventContext } from '../../contexts/event.context';
export function FilterRooms() {
  const { setSelectedCategory } = useContext(EventContext);

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
        <option value="Sypialnia">Sypialnia</option>
        <option value="2 łóżka">2 łóżka</option>
        <option value="3 łóżka">3 łóżka</option>
      </select>
    </div>
  );
}
