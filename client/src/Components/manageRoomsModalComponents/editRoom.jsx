import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EventContext } from '../../contexts/event.context';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';

const EditRoom = () => {
  const {
    roomSelection,
    setRoomSelection,
    roomId,
    setRoomId,
    showColorPicker,
    setShowColorPicker,
  } = useContext(EventContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });

  useEffect(() => {
    setRoomId(roomSelection._id);
  }, [roomSelection._id]);

  const handleColorChange = (color) => {
    setValue('roomColor', color.hex);
  };

  const handleUpdate = async (data) => {
    try {
      const response = await axiosInstance.patch(
        `/api/rooms/update-room/${roomId}`,
        data
      );
      setRoomSelection(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        paddingLeft: '1em',
        borderLeft: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <b style={{ margin: '0', marginBottom: '1em' }}>Wypełnij pola</b>
      <form style={{ display: 'flex' }} onSubmit={handleSubmit(handleUpdate)}>
        <label htmlFor="roomName">Nazwa pokoju:</label>
        <input
          type="text"
          id="roomName"
          {...register('roomName', { required: 'Nazwa pokoju jest wymagana' })}
          defaultValue={roomSelection.roomName}
        />
        {errors.roomName && <p className="error">{errors.roomName.message}</p>}

        <label htmlFor="roomNumOfGuests">Liczba miejsc:</label>
        <input
          id="roomNumOfGuests"
          {...register('roomNumOfGuests', {
            required: 'Liczba miejsc jest wymagana',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Pole może zawierać tylko liczby',
            },
            min: {
              value: 1,
              message: 'Liczba miejsc nie może być mniejsza niż 1',
            },
            max: {
              value: 9999,
              message: 'Przekroczono maksymalną liczbę osób',
            },
          })}
          defaultValue={roomSelection.roomNumOfGuests}
        />
        {errors.roomNumOfGuests && (
          <p className="error">{errors.roomNumOfGuests.message}</p>
        )}

        <label htmlFor="RoomPriceOfGuest">Cena za osobę</label>
        <input
          id="RoomPriceOfGuest"
          {...register('RoomPriceOfGuest', {
            required: 'Cena za osobę jest wymagana',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Pole może zawierać tylko liczby',
            },
            min: {
              value: 1,
              message: 'Liczba miejsc nie może być mniejsza niż 1',
            },
            max: {
              value: 9999,
              message: 'Przekroczono maksymalną liczbę osób',
            },
          })}
          defaultValue={roomSelection.RoomPriceOfGuest}
        />
        {errors.RoomPriceOfGuest && (
          <p className="error">{errors.RoomPriceOfGuest.message}</p>
        )}

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
            {...register('roomColor', {
              required: 'To pole nie może być puste',
            })}
            defaultValue={roomSelection.roomColor}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '30px',
              border: '1px solid #94a3b8',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.5em',
              backgroundColor:
                watch('roomColor') === '' ? '#cbd5e1' : watch('roomColor'),
            }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {showColorPicker ? <CloseIcon /> : ''}
          </div>
          {showColorPicker && (
            <div style={{ position: 'absolute', top: '35px', zIndex: '1' }}>
              <ChromePicker
                color={watch('roomColor')}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>
        {errors.roomColor && (
          <span className="error">{errors.roomColor.message}</span>
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
          defaultValue={roomSelection.roomLocation}
        />
        {errors.roomLocation && (
          <p className="error">{errors.roomLocation.message}</p>
        )}

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
