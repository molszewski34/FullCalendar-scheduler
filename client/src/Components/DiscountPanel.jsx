import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Box } from '@mui/material';
import { EventContext } from '../contexts/event.context';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './styles/DiscountPanel.css';
import RoomSelection from './RoomSelection';
const DiscountPanel = ({ onClose, onEventAdded }) => {
  const {
    title,
    start,
    end,
    phone,
    numOfGuests,
    priceOfGuest,
    price,
    setPrice,
    room,
    color,
    daysDifference,
    guestsFee,
    setGuestsFee,
    total,
    setTotal,
    initialInputs,
    setInitialInputs,
    discountBtns,
    roomSelection,
    destinationRoomId,
  } = useContext(EventContext);

  useEffect(() => {
    const totalPrice = total * daysDifference;
    setPrice(totalPrice.toFixed(2));
  }, [numOfGuests, priceOfGuest, total, daysDifference]);

  const onSubmit = (event) => {
    onEventAdded({
      start,
      end,
      title,
      phone,
      numOfGuests,
      priceOfGuest,
      price,
      room,
      color,
    });
    onClose();
  };

  const {
    formState: { errors },
  } = useForm();

  const handleInputChange = (index, value) => {
    if (value < 0) {
      value = 0;
    }
    const newInputValues = [...guestsFee];
    newInputValues[index] = parseFloat(value);
    const sum = newInputValues.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );

    setGuestsFee(newInputValues);
    setTotal(sum);
  };

  const incrementValue = (index) => {
    if (roomSelection && destinationRoomId) {
      const newInputValues = [...guestsFee];
      newInputValues[index] = (parseFloat(newInputValues[index]) || 0) + 1;
      const sum = newInputValues.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setTotal(sum);
      setGuestsFee(newInputValues);
      setInitialInputs(guestsFee);
    }
  };

  const decrementValue = (index) => {
    if (roomSelection && destinationRoomId) {
      const newInputValues = [...guestsFee];
      newInputValues[index] = Math.max(
        (parseFloat(newInputValues[index]) || 0) - 1,
        0
      );
      const sum = newInputValues.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setTotal(sum);
      setGuestsFee(newInputValues);
      setInitialInputs(guestsFee);
    }
  };

  const changeValuePercentage = (index, percentage) => {
    if (guestsFee === initialInputs) {
      const newInputs = [...guestsFee];
      const newValue = (newInputs[index] * (1 + percentage / 100)).toFixed(2);

      const diff = newValue - newInputs[index];
      newInputs[index] = parseFloat(newValue);

      setGuestsFee(newInputs);
      setTotal(total + parseFloat(diff));
    } else {
      const initialValue = [...initialInputs];
      const newInputs = [...guestsFee];
      const newValue = (initialValue[index] * (1 + percentage / 100)).toFixed(
        2
      );
      const diff = newValue - newInputs[index];
      newInputs[index] = parseFloat(newValue);
      setGuestsFee(newInputs);
      setTotal(total + parseFloat(diff));
    }
  };
  return (
    <div
      className="discount-container"
      style={{
        height: '600px',
        width: '300px',
        overflowY: 'auto',
        borderBottom: `${guestsFee.length >= 7 ? '1px solid #a1a1aa' : ''} `,
        paddingBottom: `${guestsFee.length >= 7 ? '0.8em' : ''} `,
        scrollBehavior: 'smooth',
        overflowScrolling: 'touch',
        overscrollBehaviorY: 'none',
      }}
    >
      {guestsFee.map((value, index) => (
        <div className="discount-box">
          <div className="discount-box-wrapper">
            <div className="discount-box-item" key={index}>
              <PersonIcon style={{ color: '#757575' }} />
              <input
                key={index}
                type="text"
                value={value}
                disabled={!roomSelection || !destinationRoomId}
                style={{
                  fontSize: '1em',
                  color: ` ${
                    value[index] <= 0 || value[index] <= '0' ? 'red' : ''
                  }`,
                  border: `solid 1px ${
                    value[index] <= 0 || value[index] <= '0' ? 'red' : ''
                  }`,
                }}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <div className="discount-box-item-btns">
                <RemoveCircleOutlineIcon
                  fontSize="large"
                  type="button"
                  onClick={() => decrementValue(index)}
                  style={
                    !roomSelection || !destinationRoomId
                      ? { color: '#d1d5db' }
                      : { color: '#ef4444' }
                  }
                />
                <AddCircleOutlineIcon
                  fontSize="large"
                  type="button"
                  onClick={() => incrementValue(index)}
                  style={
                    !roomSelection || !destinationRoomId
                      ? { color: '#d1d5db' }
                      : { color: '#8bc34a' }
                  }
                />
              </div>
            </div>
            <div className="discount-btns ">
              {discountBtns.map((discountBtn) => (
                <Button
                  variant="contained"
                  style={
                    !roomSelection || !destinationRoomId
                      ? { backgroundColor: '#d1d5db', margin: '0' }
                      : { backgroundColor: discountBtn.bgColor, margin: '0' }
                  }
                  className="discount-btn"
                  sx={{ my: 1 }}
                  size="small"
                  onClick={() =>
                    changeValuePercentage(index, discountBtn.value)
                  }
                  disabled={!roomSelection || !destinationRoomId}
                >
                  {discountBtn.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountPanel;
