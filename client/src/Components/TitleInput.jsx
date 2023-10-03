import React from 'react';
import { Controller } from 'react-hook-form';

const TitleInput = ({
  title,
  setTitle,
  error,
  control,
  errors,
  editedEvent,
}) => {
  return (
    <div className="modal-edit_input">
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          required: 'To pole jest wymagane',
          minLength: {
            value: 1,
            message: 'Imię musi mieć co najmniej 1 znak',
          },
          maxLength: {
            value: 20,
            message: 'Imię nie może mieć więcej niż 20 znaków',
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Imię może zawierać tylko litery',
          },
        }}
        render={({ field }) => (
          <input
            {...field}
            placeholder={
              editedEvent && editedEvent._def.title
                ? editedEvent._def.title
                : 'Dodaj tytuł'
            }
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
