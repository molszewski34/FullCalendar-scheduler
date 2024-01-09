import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button } from '@mui/material';
import { ChromePicker } from 'react-color';
const AddRoom = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const [roomData, setRoomData] = useState({
    roomName: '',
    roomNumOfGuests: 0,
    RoomPriceOfGuest: 0,
    isApartment: false,
    roomColor: '',
    roomLocation: '',
    events: [],
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleColorChange = (color) => {
    setRoomData({
      ...roomData,
      roomColor: color.hex,
    });
    setShowColorPicker(false);
  };

  const handleChange = async (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        '/api/rooms/create-room',
        roomData
      );

      console.log('Data added successfully:', response.data);

      setRoomData({
        roomName: '',
        roomNumOfGuests: 0,
        RoomPriceOfGuest: 0,
        isApartment: false,
        roomColor: '',
        roomLocation: '',
        events: [],
      });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div>
      <h2>Wypełnij pola</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomName">Nazwa pokoju:</label>
        <input
          type="text"
          id="roomName"
          name="roomName"
          value={roomData.roomName}
          onChange={handleChange}
          placeholder="np. Pokój 3"
        />

        <label htmlFor="roomNumOfGuests">Liczba miejsc:</label>
        <input
          type="number"
          id="roomNumOfGuests"
          name="roomNumOfGuests"
          value={roomData.roomNumOfGuests}
          onChange={handleChange}
        />

        <label htmlFor="RoomPriceOfGuest">Cena za osobę</label>
        <input
          type="text"
          id="RoomPriceOfGuest"
          name="RoomPriceOfGuest"
          value={roomData.RoomPriceOfGuest}
          onChange={handleChange}
        />

        <label htmlFor="isApartment">Czy jest Apartmentem?:</label>
        <input
          type="checkbox"
          id="isApartment"
          name="isApartment"
          checked={roomData.isApartment}
          onChange={() =>
            setRoomData({ ...roomData, isApartment: !roomData.isApartment })
          }
        />

        <label htmlFor="roomColor">Kolor pokoju:</label>
        <div>
          <input
            type="text"
            id="roomColor"
            name="roomColor"
            value={roomData.roomColor}
            onChange={handleChange}
            onFocus={() => setShowColorPicker(true)}
            placeholder="Kliknij by wybrać"
          />
          {showColorPicker && (
            <ChromePicker
              color={roomData.roomColor}
              onChange={handleColorChange}
            />
          )}
        </div>

        <label htmlFor="roomLocation">Lokalizacja:</label>
        <input
          type="text"
          id="roomLocation"
          name="roomLocation"
          value={roomData.roomLocation}
          onChange={handleChange}
          placeholder="np. 2 piętro"
        />

        <Button variant="contained" size="small" type="submit">
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default AddRoom;
