import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const PhoneInput = ({ phone, setPhone, editedEvent, control, errors }) => {
  return (
    <div>
      <Controller
        name="phone"
        control={control}
        defaultValue={phone}
        rules={{
          required: 'To pole jest wymagane',
          minLength: {
            value: 9,
            message: 'Numer telefonu jest za krótki',
          },
          maxLength: {
            value: 20,
            message: 'Numer telefonu jest za długi',
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Pole może zawierać tylko cyfry',
          },
        }}
        render={({ field }) => (
          <TextField
            label={
              editedEvent && editedEvent._def.extendedProps.phone
                ? editedEvent._def.extendedProps.phone
                : 'Telefon'
            }
            variant="filled"
            size="small"
            {...field}
            onChange={(event) => {
              field.onChange(event.target.value);
              setPhone(event.target.value);
            }}
          />
        )}
      />
      {errors.phone && <p className="error">{errors.phone.message}</p>}
    </div>
  );
};

export default PhoneInput;
