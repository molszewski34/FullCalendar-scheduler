import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { EventContext } from '../../contexts/event.context';
import AddIcon from '@mui/icons-material/Add';

const AddRoom = () => {
  const { showColorPicker, setShowColorPicker } = useContext(EventContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [roomColor, setRoomColor] = useState('#cbd5e1');

  const handleColorChange = (color) => {
    setRoomColor(color.hex);
  };

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, roomColor: roomColor };
      const response = await axiosInstance.post(
        '/api/rooms/create-room',
        formData
      );

      console.log('Data added successfully:', response.data);

      reset();
      setRoomColor('#cbd5e1');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  console.log(roomColor);

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
      <form style={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="roomName">Nazwa pokoju:</label>
        <input
          type="text"
          id="roomName"
          {...register('roomName', {
            required: 'Nazwa pokoju jest wymagana',
            minLength: {
              value: 3,
              message: 'Imię musi mieć co najmniej 3 znako',
            },
            maxLength: {
              value: 30,
              message: 'Imię nie może mieć więcej niż 20 znaków',
            },
          })}
          placeholder="np. Pokój 3"
        />
        {errors.roomName && (
          <span className="error">{errors.roomName.message}</span>
        )}

        <label htmlFor="roomNumOfGuests">Liczba miejsc:</label>
        <input
          type="text"
          id="roomNumOfGuests"
          {...register('roomNumOfGuests', {
            required: 'Liczba miejsc jest wymagana',
            min: {
              value: 1,
              message: 'Liczba miejsc nie może być mniejsza niż 1',
            },
            max: {
              value: 9999,
              message: 'Przekroczono maksymalną liczbę osób',
            },
            pattern: {
              value: /^[0-9]*$/,
              message: 'Pole może zawierać tylko liczby',
            },
          })}
          placeholder="np. 3"
        />
        {errors.roomNumOfGuests && (
          <span className="error">{errors.roomNumOfGuests.message}</span>
        )}

        <label htmlFor="RoomPriceOfGuest">Cena za osobę:</label>
        <input
          type="text"
          id="RoomPriceOfGuest"
          {...register('RoomPriceOfGuest', {
            required: 'Cena za osobę jest wymagana',
            min: {
              value: 1,
              message: 'Liczba miejsc nie może być mniejsza niż 1',
            },
            pattern: {
              value: /^[0-9]*$/,
              message: 'Pole może zawierać tylko liczby',
            },
          })}
          placeholder="np. 60"
        />
        {errors.RoomPriceOfGuest && (
          <span className="error">{errors.RoomPriceOfGuest.message}</span>
        )}

        <label htmlFor="roomColor">Kolor pokoju:</label>
        <div
          style={{
            display: 'flex',
            gap: '0.3em',
            position: 'relative',
          }}
        >
          <input type="text" id="roomColor" value={roomColor} />

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
              backgroundColor: roomColor,
            }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {showColorPicker ? <CloseIcon /> : ''}
          </div>
        </div>
        {errors.roomColor && (
          <span className="error">{errors.roomColor.message}</span>
        )}
        {showColorPicker && (
          <div style={{ position: 'absolute', bottom: '-130px', zIndex: '1' }}>
            <ChromePicker color={roomColor} onChange={handleColorChange} />
          </div>
        )}

        <label htmlFor="roomLocation">Lokalizacja:</label>
        <input
          type="text"
          id="roomLocation"
          {...register('roomLocation', {
            required: 'Lokalizacja jest wymagana',
            minLength: {
              value: 3,
              message: 'Nazwa musi mieć co najmniej 3 znaki',
            },
            maxLength: {
              value: 30,
              message: 'Nazwa nie może mieć więcej niż 20 znaków',
            },
          })}
          placeholder="np. 2 piętro"
        />
        {errors.roomLocation && (
          <span className="error">{errors.roomLocation.message}</span>
        )}

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
