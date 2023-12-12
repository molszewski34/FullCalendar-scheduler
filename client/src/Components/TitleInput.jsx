import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
const TitleInput = ({
  title,
  setTitle,
  error,
  control,
  errors,
  editedEvent,
}) => {
  return (
    <div>
      <Controller
        name="title"
        control={control}
        defaultValue={title}
        rules={{
          required: 'To pole jest wymagane',
          minLength: {
            value: 1,
            message: 'Imię musi mieć co najmniej 1 znak',
          },
          maxLength: {
            value: 30,
            message: 'Imię nie może mieć więcej niż 20 znaków',
          },
          pattern: {
            value: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/,
            message: 'Imię może zawierać tylko litery',
          },
        }}
        render={({ field }) => (
          <TextField
            label={
              editedEvent && editedEvent._def.title
                ? editedEvent._def.title
                : 'Dodaj tytuł'
            }
            variant="filled"
            size="small"
            {...field}
            className="input-title"
            onChange={(event) => {
              field.onChange(event.target.value);
              setTitle(event.target.value);
            }}
          />
        )}
      />
      {errors.title && <p className="error">{errors.title.message}</p>}
    </div>
  );
};

export default TitleInput;
