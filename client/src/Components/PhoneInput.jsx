import React from 'react';
import { Controller } from 'react-hook-form';

const PhoneInput = ({ phone, setPhone, editedEvent, control, errors }) => {
  return (
    <div className="modal-edit_input">
      <label htmlFor="">Telefon:</label>
      <Controller
        name="phone"
        control={control}
        defaultValue=""
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
          <input
            {...field}
            placeholder={
              editedEvent && editedEvent._def.extendedProps.phone
                ? editedEvent._def.extendedProps.phone
                : '500123456'
            }
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
