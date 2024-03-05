import React from 'react';
import { TextField } from '@mui/material';
const Form = ({ register, errors }) => {
  return (
    <>
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
    </>
  );
};

export default Form;
