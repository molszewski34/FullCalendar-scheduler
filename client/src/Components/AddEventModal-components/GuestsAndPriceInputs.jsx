import React from 'react';
import { useForm } from 'react-hook-form';

const GuestsAndPriceInputs = ({
  numOfGuests,
  setNumOfGuests,
  priceOfGuest,
  setPriceOfGuest,
}) => {
  const handleNumOfGuestsIncrement = () => {
    setNumOfGuests(numOfGuests + 1);
  };

  const handleNumOfGuestsDecrement = () => {
    if (numOfGuests > 1) {
      setNumOfGuests(numOfGuests - 1);
    }
  };

  const handlePriceOfGuestIncrement = () => {
    setPriceOfGuest(priceOfGuest + 1);
  };

  const handlePriceOfGuestDecrement = () => {
    if (priceOfGuest > 1) {
      setPriceOfGuest(priceOfGuest - 1);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(handleNumOfGuestsDecrement);
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

export default GuestsAndPriceInputs;
