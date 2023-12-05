import React, { useState, useContext } from 'react';
import Person4Icon from '@mui/icons-material/Person4';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { EventContext } from '../contexts/event.context';
import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import //   handlEditedPriceOfGuestIncrement,
//   handlePriceOfGuestDecrement,
//   handlePriceOfGuestIncrement,
'./utilities/eventUtilities';
const GuestItem = ({ priceOfGuest }) => {
  const { setPriceOfGuest } = useContext(EventContext);

  const [guestValue, setGuestValue] = useState(priceOfGuest);

  const {
    register,
    formState: { errors },
  } = useForm();

  //   const handleInputChange = (event) => {
  //     setGuestValue(event.target.value);
  //   };

  const handlePriceOfGuestIncrement = () => {
    setPriceOfGuest(priceOfGuest + 1);
  };

  const handlePriceOfGuestDecrement = () => {
    if (priceOfGuest > 1) {
      setPriceOfGuest(priceOfGuest - 1);
    }
  };

  return (
    <div
      className="discount-box"
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <div className="discount-box-wrapper">
        <header>Osoba</header>
        <div className="discount-box-item">
          <Person4Icon />
          {/* <input type="text" value={guestValue} onChange={handleInputChange} /> */}
          <input
            {...register('priceOfGuest', {
              required: true,
              min: 1,
            })}
            value={priceOfGuest}
            onChange={(e) => setPriceOfGuest(e.target.value)}
            // onChange={(e) => handlePriceChange(e, i)}
          />
          <div className="discount-box-item-btns">
            <RemoveCircleOutlineIcon
              fontSize="medium"
              type="button"
              onClick={handlePriceOfGuestDecrement}
            />
            <AddCircleOutlineIcon
              fontSize="medium"
              type="button"
              onClick={handlePriceOfGuestIncrement}
            />
          </div>
        </div>
        <button className="discount-btn">50%</button>
      </div>
    </div>
  );
};

export default GuestItem;
