import React from 'react';
import { TextField } from '@mui/material';
const FormRoomLocation = ({ register, errors }) => {
  return (
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
  );
};

export default FormRoomLocation;
