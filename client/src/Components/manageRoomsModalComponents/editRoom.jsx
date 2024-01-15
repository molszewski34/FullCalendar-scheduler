import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EventContext } from '../../contexts/event.context';
import { TextField, Checkbox, Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
const EditRoom = () => {
  const { roomSelection, setRoomSelection, roomId, setRoomId } =
    useContext(EventContext);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });

  const [updateData, setUpdateData] = useState({
    roomName: '',
    roomNumOfGuests: '',
    RoomPriceOfGuest: '',
    isApartment: false,
    roomColor: '',
    roomLocation: '',
    events: [],
  });

  useEffect(() => {
    setRoomId(roomSelection._id);
  }, [roomSelection._id]);

  const handleColorChange = (color) => {
    setUpdateData({
      ...updateData,
      roomColor: color.hex,
    });
  };

  const handleInputChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/api/rooms/update-room/${roomId}`,
        updateData
      );
      console.log(response.data);
      setRoomSelection(response.data);
    } catch (error) {
      console.error(error);
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
      }}
    >
      <b style={{ margin: '0', marginBottom: '1em' }}>Wypełnij pola</b>
      <form style={{ display: 'flex' }} onSubmit={handleUpdate}>
        <label htmlFor="roomName">Nazwa pokoju:</label>
        <input
          type="text"
          id="roomName"
          name="roomName"
          value={updateData.roomName}
          onChange={handleInputChange}
          placeholder={roomSelection.roomName}
        />

        <label htmlFor="roomNumOfGuests">Liczba miejsc:</label>
        <input
          type="text"
          id="roomNumOfGuests"
          name="roomNumOfGuests"
          value={updateData.roomNumOfGuests}
          onChange={handleInputChange}
          placeholder={roomSelection.roomNumOfGuests}
        />

        <label htmlFor="RoomPriceOfGuest">Cena za osobę</label>
        <input
          type="text"
          id="RoomPriceOfGuest"
          name="RoomPriceOfGuest"
          value={updateData.RoomPriceOfGuest}
          onChange={handleInputChange}
          placeholder={roomSelection.RoomPriceOfGuest}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="isApartment">Czy jest Apartamentem?</label>
          <input
            type="checkbox"
            id="isApartment"
            name="isApartment"
            checked={updateData.isApartment}
            onChange={() =>
              setUpdateData({
                ...updateData,
                isApartment: !updateData.isApartment,
              })
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
            value={updateData.roomColor}
            onChange={handleInputChange}
            placeholder={roomSelection.roomColor}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '30px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.5em',
              backgroundColor:
                updateData.roomColor === '' ? '#cbd5e1' : updateData.roomColor,
            }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {showColorPicker ? <CloseIcon /> : ''}
          </div>
        </div>
        {showColorPicker && (
          <div style={{ position: 'absolute', bottom: '-130px', zIndex: '1' }}>
            <ChromePicker
              color={updateData.roomColor}
              onChange={handleColorChange}
            />
          </div>
        )}

        <label htmlFor="roomLocation">Lokalizacja:</label>
        <input
          type="text"
          id="roomLocation"
          name="roomLocation"
          value={updateData.roomLocation}
          onChange={handleInputChange}
          placeholder={roomSelection.roomLocation}
        />

        <Button
          variant="contained"
          size="small"
          type="submit"
          style={{
            marginLeft: '.2em',
            marginTop: '1em',
            backgroundColor: '#0ea5e9',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Edytuj <EditIcon style={{ marginLeft: '.2em', fontSize: '1.2em' }} />
        </Button>
      </form>
    </div>
  );
};

export default EditRoom;
