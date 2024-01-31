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
    roomSelection,
  } = useContext(EventContext);

  const addInput = () => {
    if (roomSelection != '') {
      setGuestsFee([...guestsFee, roomSelection.RoomPriceOfGuest]);
      setInitialInputs([...initialInputs, roomSelection.RoomPriceOfGuest]);
      setTotal(total + roomSelection.RoomPriceOfGuest);
    }
  };

  const removeInput = () => {
    if (guestsFee.length > 0 && roomSelection != '') {
      const lastInputValue = guestsFee[guestsFee.length - 1];
      setGuestsFee(guestsFee.slice(0, -1));
      setInitialInputs(initialInputs.slice(0, -1));
      setTotal(total - lastInputValue);
    }
  };

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
            disabled={roomSelection == '' ? true : false}
            value={guestsFee.length || '--'}
            onChange={(e) => setNumOfGuests(e.target.value)}
          />
          <Box sx={{ display: 'inline-flex' }} spacing={{ xs: 1, sm: 2 }}>
            <RemoveCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={removeInput}
              style={{ color: roomSelection == '' ? '#d1d5db' : '' }}
            />

            <AddCircleOutlineIcon
              fontSize="large"
              type="button"
              onClick={addInput}
              style={{ color: roomSelection == '' ? '#d1d5db' : '' }}
            />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default GuestsAndPriceInputs;
