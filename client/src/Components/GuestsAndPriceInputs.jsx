import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
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
    formState: { errors },
  } = useForm();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      useFlexGap
      spacing={2}
      className=""
    >
      <div>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          spacing={{ xs: 1, sm: 2 }}
        >
          <TextField
            label="Liczba gości"
            variant="filled"
            size="small"
            {...register('numOfGuests', {
              required: true,
              min: 1,
              max: 6,
            })}
            value={numOfGuests}
            onChange={(e) => setNumOfGuests(e.target.value)}
          />
          <Box sx={{ display: 'inline-flex' }} spacing={{ xs: 1, sm: 2 }}>
            <RemoveCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={handleNumOfGuestsDecrement}
            />

            <AddCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={handleNumOfGuestsIncrement}
            />
          </Box>
        </Box>
        {errors.numOfGuests && errors.numOfGuests.type === 'min' && (
          <p className="error">Minimalnie 1 gość</p>
        )}
        {errors.numOfGuests && errors.numOfGuests.type === 'max' && (
          <p className="error">Maksymalnie 6 gości</p>
        )}
      </div>

      <div className="modal-edit_input">
        {/* <label htmlFor="">Cena za gościa:</label> */}
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          spacing={{ xs: 1, sm: 2 }}
        >
          <TextField
            label="Cena"
            variant="filled"
            size="small"
            {...register('priceOfGuest', {
              required: true,
              min: 1,
            })}
            value={priceOfGuest}
            onChange={(e) => setPriceOfGuest(e.target.value)}
          />
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            spacing={{ xs: 1, sm: 2 }}
          >
            {/* <button > */}
            <RemoveCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={handlePriceOfGuestDecrement}
            />
            {/* </button> */}
            {/* <button type="button" onClick={handlePriceOfGuestIncrement}> */}
            <AddCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={handlePriceOfGuestIncrement}
            />
            {/* </button> */}
          </Box>
        </Box>
        {errors.priceOfGuest && errors.priceOfGuest.type === 'required' && (
          <p className="error">Pole jest wymagane</p>
        )}
        {errors.priceOfGuest && errors.priceOfGuest.type === 'min' && (
          <p className="error">Minimalnie 1 zł</p>
        )}
      </div>
    </Box>
  );
};

export default GuestsAndPriceInputs;
