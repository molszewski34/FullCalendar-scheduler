import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';

import AddIcon from '@mui/icons-material/Add';

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
    <div
      style={{
        marginLeft: '2em',
        paddingLeft: '1em',
        borderLeft: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <b style={{ margin: '0', marginBottom: '1em' }}>Wypełnij pola</b>
      <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
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
          type="text"
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="isApartment">Czy jest Apartamentem?</label>
          <input
            type="checkbox"
            id="isApartment"
            name="isApartment"
            checked={roomData.isApartment}
            onChange={() =>
              setRoomData({ ...roomData, isApartment: !roomData.isApartment })
            }
          />
        </div>
        <label htmlFor="roomColor">Kolor pokoju:</label>

        <div
          style={{
            display: 'flex',
            gap: '0.3em',
            position: 'relative',
          }}
        >
          <input
            type="text"
            id="roomColor"
            name="roomColor"
            value={roomData.roomColor}
            onChange={handleChange}
            placeholder="Kliknij przycisk"
          />
          <div
            style={{
              width: '40px',
              height: '30px',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor:
                roomData.roomColor === '' ? '#cbd5e1' : roomData.roomColor,
            }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          ></div>
        </div>
        {showColorPicker && (
          <div style={{ position: 'absolute', bottom: '-130px', zIndex: '1' }}>
            <ChromePicker
              color={roomData.roomColor}
              onChange={handleColorChange}
            />
          </div>
        )}

        <label htmlFor="roomLocation">Lokalizacja:</label>
        <input
          type="text"
          id="roomLocation"
          name="roomLocation"
          value={roomData.roomLocation}
          onChange={handleChange}
          placeholder="np. 2 piętro"
        />

        <Button
          variant="contained"
          size="small"
          type="submit"
          style={{
            marginLeft: '.2em',
            marginTop: '1em',
            backgroundColor: '#22c55e',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Dodaj <AddIcon style={{ marginLeft: '.2em' }} />
        </Button>
      </form>
    </div>
  );
};

export default AddRoom;
