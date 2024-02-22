import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { EventContext } from '../../contexts/event.context';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { useMutation, useQueryClient } from 'react-query';
const AddRoom = () => {
  const { showColorPicker, setShowColorPicker } = useContext(EventContext);
  const queryClient = useQueryClient();

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

  const mutation = useMutation(
    async (data) => await axiosInstance.post('/api/rooms/create-room', data),
    {
      onSuccess: () => {
        console.log('Data added successfully');
        reset();
        setRoomColor('#cbd5e1');
        queryClient.invalidateQueries('rooms');
      },
      onError: (error) => {
        console.error('Error adding data:', error);
      },
    }
  );

  const handleColorChange = (color) => {
    setRoomColor(color.hex);
  };

  const onSubmit = (data) => {
    const formData = { ...data, roomColor: roomColor };
    mutation.mutate(formData);
  };

  return (
    <main
      style={{
        marginLeft: '2em',
        paddingLeft: '1em',
        borderLeft: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <b style={{ margin: '0', marginBottom: '1em' }}>Wypełnij pola</b>
      <form
        style={{ display: 'flex', gap: '1em' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'normal' }} htmlFor="roomName">
            Nazwa pokoju:
          </label>
          <TextField
            size="small"
            variant="standard"
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
        </div>
        <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'normal' }} htmlFor="roomNumOfGuests">
            Liczba miejsc:
          </label>
          <TextField
            size="small"
            variant="standard"
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
        </div>
        <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'normal' }} htmlFor="RoomPriceOfGuest">
            Cena za osobę:
          </label>
          <TextField
            size="small"
            variant="standard"
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
        </div>
        <div className="">
          <label style={{ fontWeight: 'normal' }} htmlFor="roomColor">
            Kolor pokoju:
          </label>
          <div
            style={{
              display: 'flex',
              gap: '0.3em',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <TextField
              size="small"
              variant="standard"
              type="text"
              id="roomColor"
              value={roomColor}
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
                backgroundColor: roomColor,
              }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              {showColorPicker ? <CloseIcon /> : ''}
            </div>
            {showColorPicker && (
              <div style={{ position: 'absolute', top: '35px', zIndex: '1' }}>
                <ChromePicker color={roomColor} onChange={handleColorChange} />
              </div>
            )}
          </div>
          {errors.roomColor && (
            <span className="error">{errors.roomColor.message}</span>
          )}
        </div>
        <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'normal' }} htmlFor="roomLocation">
            Lokalizacja:
          </label>
          <TextField
            size="small"
            variant="standard"
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
        </div>
        <Button
          variant="contained"
          size="large"
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
    </main>
  );
};

export default AddRoom;
