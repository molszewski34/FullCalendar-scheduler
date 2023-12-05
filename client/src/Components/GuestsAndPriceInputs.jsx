import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { EventContext } from '../contexts/event.context';
const GuestsAndPriceInputs = (
  {
    // numOfGuests,
    // setNumOfGuests,
    // priceOfGuest,
    // setPriceOfGuest,
  }
) => {
  const {
    numOfGuests,
    setNumOfGuests,
    priceOfGuest,
    setPriceOfGuest,

    numInputs,
    setNumInputs,
    inputValues,
    setInputValues,
    guestsFee,
    setGuestsFee,
    total,
    setTotal,
    initialInputs,
    setInitialInputs,
  } = useContext(EventContext);

  // const handleNumOfGuestsIncrement = () => {
  //   setNumOfGuests(numOfGuests + 1);
  // };

  // const handleNumOfGuestsDecrement = () => {
  //   if (numOfGuests > 1) {
  //     setNumOfGuests(numOfGuests - 1);
  //   }
  // };

  // const handlePriceOfGuestIncrement = () => {
  //   setPriceOfGuest(priceOfGuest + 1);
  // };

  // const handlePriceOfGuestDecrement = () => {
  //   if (priceOfGuest > 1) {
  //     setPriceOfGuest(priceOfGuest - 1);
  //   }
  // };

  // const handleAddInput = () => {
  //   setNumOfGuests(numOfGuests + 1);
  //   setNumInputs(numInputs + 1);
  //   setInputValues([...inputValues, 65]);
  // };

  // const handleRemoveInput = () => {
  //   if (numInputs || numOfGuests > 0) {
  //     setNumOfGuests(numOfGuests - 1);
  //     setNumInputs(numInputs - 1);
  //     setInputValues(inputValues.slice(0, numInputs - 1));
  //   }
  // };

  const addInput = () => {
    if (guestsFee.length < 6) {
      setGuestsFee([...guestsFee, 65]);
      setInitialInputs([...initialInputs, 65]);
      setTotal(total + 65);
    }
  };

  const removeInput = () => {
    if (guestsFee.length > 0) {
      const lastInputValue = guestsFee[guestsFee.length - 1];
      setGuestsFee(guestsFee.slice(0, -1));
      setInitialInputs(initialInputs.slice(0, -1));
      setTotal(total - lastInputValue);
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
            value={guestsFee.length}
            // value={numOfGuests}
            onChange={(e) => setNumOfGuests(e.target.value)}
          />
          <Box sx={{ display: 'inline-flex' }} spacing={{ xs: 1, sm: 2 }}>
            <RemoveCircleOutlineIcon
              fontSize="large"
              type="button"
              // onClick={handleNumOfGuestsDecrement}
              // onClick={handleRemoveInput}
              onClick={removeInput}
            />

            <AddCircleOutlineIcon
              fontSize="large"
              type="button"
              // onClick={handleNumOfGuestsIncrement}
              // onClick={handleAddInput}
              onClick={addInput}
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

      {/* <div className="modal-edit_input">
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
            <RemoveCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={handlePriceOfGuestDecrement}
            />

            <AddCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={handlePriceOfGuestIncrement}
            />
          </Box>
        </Box>
        {errors.priceOfGuest && errors.priceOfGuest.type === 'required' && (
          <p className="error">Pole jest wymagane</p>
        )}
        {errors.priceOfGuest && errors.priceOfGuest.type === 'min' && (
          <p className="error">Minimalnie 1 zł</p>
        )}
      </div> */}
    </Box>
  );
};

export default GuestsAndPriceInputs;
