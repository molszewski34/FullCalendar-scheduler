import React, { useState, useEffect } from 'react';
import DateTime from 'react-datetime';
import { useForm } from 'react-hook-form';
import {
  handleNumOfGuestsIncrement,
  handleNumOfGuestsDecrement,
  handlePriceOfGuestIncrement,
  handlePriceOfGuestDecrement,
} from './eventUtilities';
const GuestDetails = ({
  numOfGuests,
  setNumOfGuests,
  priceOfGuest,
  setPriceOfGuest,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="">
      <div className="modal-edit_input">
        <label htmlFor="">Liczba gości:</label>
        <div>
          <input
            {...register('numOfGuests', {
              required: true,
              min: 1,
              max: 6,
            })}
            value={numOfGuests}
            onChange={(e) => setNumOfGuests(e.target.value)}
          />
          <button type="button" onClick={handleNumOfGuestsDecrement}>
            -
          </button>
          <button type="button" onClick={handleNumOfGuestsIncrement}>
            +
          </button>
        </div>
        {errors.numOfGuests && errors.numOfGuests.type === 'min' && (
          <p className="error">Minimalnie 1 gość</p>
        )}
        {errors.numOfGuests && errors.numOfGuests.type === 'max' && (
          <p className="error">Maksymalnie 6 gości</p>
        )}
      </div>

      <div className="modal-edit_input">
        <label htmlFor="">Cena za gościa:</label>
        <div>
          <input
            {...register('priceOfGuest', {
              required: true,
              min: 1,
            })}
            value={priceOfGuest}
            onChange={(e) => setPriceOfGuest(e.target.value)}
          />
          <button type="button" onClick={handlePriceOfGuestDecrement}>
            -
          </button>
          <button type="button" onClick={handlePriceOfGuestIncrement}>
            +
          </button>
        </div>
        {errors.priceOfGuest && errors.priceOfGuest.type === 'required' && (
          <p className="error">Pole jest wymagane</p>
        )}
        {errors.priceOfGuest && errors.priceOfGuest.type === 'min' && (
          <p className="error">Minimalnie 1 zł</p>
        )}
      </div>
    </div>
  );
};

export default GuestDetails;
