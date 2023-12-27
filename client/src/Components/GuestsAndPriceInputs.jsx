import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { EventContext } from '../contexts/event.context';
const GuestsAndPriceInputs = ({}) => {
  const {
    setNumOfGuests,
    guestsFee,
    setGuestsFee,
    total,
    setTotal,
    initialInputs,
    setInitialInputs,
  } = useContext(EventContext);

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
            onChange={(e) => setNumOfGuests(e.target.value)}
          />
          <Box sx={{ display: 'inline-flex' }} spacing={{ xs: 1, sm: 2 }}>
            <RemoveCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={removeInput}
            />

            <AddCircleOutlineIcon
              fontSize="large"
              type="button"
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
    </Box>
  );
};

export default GuestsAndPriceInputs;
