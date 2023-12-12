import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Form from './Form';
import { Button, Box } from '@mui/material';
import { EventContext } from '../contexts/event.context';
import {
  handleNumOfGuestsIncrement,
  handleNumOfGuestsDecrement,
  handlePriceOfGuestIncrement,
  handlePriceOfGuestDecrement,
} from './utilities/eventUtilities';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import Header from './Header';
import GuestItem from './GuestItem';
const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const {
    title,
    setTitle,
    start,
    setStart,
    end,
    setEnd,
    phone,
    setPhone,
    numOfGuests,
    setNumOfGuests,
    priceOfGuest,
    setPriceOfGuest,
    price,
    setPrice,
    room,
    setRoom,
    color,
    setColor,
    setModalOpen,
    daysDifference,
    setDaysDifference,
    setOverlay,
    guestsFee,
    setGuestsFee,
    total,
    setTotal,
    initialInputs,
    setInitialInputs,
  } = useContext(EventContext);

  const [selectedRoom, setSelectedRoom] = useState('');
  // const [appliedDiscounts, setAppliedDiscounts] = useState(
  //   Array(guestsFee.length).fill(false)
  // );

  useEffect(() => {
    const totalPrice = total * daysDifference;
    setPrice(totalPrice);
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
    const newValue = parseInt(value) || 0;
    const newInputs = [...guestsFee];

    const diff = newValue - newInputs[index];
    newInputs[index] = newValue;
    setGuestsFee(newInputs);
    setInitialInputs(newInputs);
    setTotal(total + diff);
  };

  const incrementValue = (index) => {
    const newInputs = [...guestsFee];
    newInputs[index] += 1;
    setGuestsFee(newInputs);
    setInitialInputs(newInputs);
    setTotal(total + 1);
  };

  const decrementValue = (index) => {
    const newInputs = [...guestsFee];
    newInputs[index] -= 1;
    setGuestsFee(newInputs);
    setInitialInputs(newInputs);
    setTotal(total - 1);
  };

  const changeValuePercentage = (index, percentage) => {
    if (guestsFee === initialInputs) {
      const newInputs = [...guestsFee];
      const newValue = newInputs[index] * (1 + percentage / 100);
      const diff = newValue - newInputs[index];
      newInputs[index] = newValue;
      setGuestsFee(newInputs);
      setTotal(total + diff);
    } else {
      const initialValue = [...initialInputs];
      const newInputs = [...guestsFee];
      const newValue = initialValue[index] * (1 + percentage / 100);
      const diff = newValue - newInputs[index];
      newInputs[index] = newValue;
      setGuestsFee(newInputs);
      setTotal(total + diff);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-edit">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: 1,
              paddingRight: 2,
            }}
            mr={2}
          >
            <header className="">
              <Button
                variant="contained"
                color="info"
                onClick={() => {
                  setModalOpen(false);
                  setOverlay(false);
                }}
              >
                Anuluj
              </Button>
              <h2>Dodaj wydarzenie</h2>
            </header>

            <Form
              title={title}
              setTitle={setTitle}
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
              phone={phone}
              setPhone={setPhone}
              numOfGuests={numOfGuests}
              setNumOfGuests={setNumOfGuests}
              priceOfGuest={priceOfGuest}
              setPriceOfGuest={setPriceOfGuest}
              price={price}
              setPrice={setPrice}
              room={room}
              setRoom={setRoom}
              setColor={setColor}
              total={total}
              setSelectedRoom={setSelectedRoom}
              handleNumOfGuestsIncrement={handleNumOfGuestsIncrement}
              handleNumOfGuestsDecrement={handleNumOfGuestsDecrement}
              handlePriceOfGuestIncrement={handlePriceOfGuestIncrement}
              handlePriceOfGuestDecrement={handlePriceOfGuestDecrement}
              onSubmit={onSubmit}
              errors={errors}
              setDaysDifference={setDaysDifference}
            ></Form>
          </Box>

          <div>
            {guestsFee.map((value, index) => (
              <div className="discount-box">
                <div className="discount-box-wrapper">
                  <div className="discount-box-item" key={index}>
                    <PersonIcon style={{ color: '#757575' }} />
                    <input
                      key={index}
                      type="text"
                      value={value}
                      style={{
                        fontSize: '1em',
                      }}
                      onChange={(e) =>
                        handleInputChange(index, parseInt(e.target.value))
                      }
                    />
                    <div className="discount-box-item-btns">
                      <RemoveCircleOutlineIcon
                        fontSize="large"
                        type="button"
                        onClick={() => decrementValue(index)}
                        color="warning"
                      />
                      <AddCircleOutlineIcon
                        fontSize="large"
                        type="button"
                        onClick={() => incrementValue(index)}
                        style={{ color: '#8bc34a' }}
                      />
                    </div>
                  </div>
                  <div className="discount-btns ">
                    <Button
                      variant="contained"
                      className="discount-btn"
                      sx={{ my: 1 }}
                      size="small"
                      onClick={() => changeValuePercentage(index, -50)}
                      style={{
                        color: '#fff',
                        backgroundColor: '#ff5252',
                        fontWeight: 'bold',
                      }}
                    >
                      50%
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        color: '#fff',
                        backgroundColor: '#fb8c00',
                        fontWeight: 'bold',
                      }}
                      className="discount-btn"
                      sx={{ my: 1 }}
                      size="small"
                      onClick={() => changeValuePercentage(index, -25)}
                    >
                      25%
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        color: '#fff',
                        backgroundColor: '#00c853',
                        fontWeight: 'bold',
                      }}
                      color="secondary"
                      className="discount-btn"
                      sx={{ my: 1 }}
                      size="small"
                      onClick={() => changeValuePercentage(index, -10)}
                    >
                      10%
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AddEventModal;
