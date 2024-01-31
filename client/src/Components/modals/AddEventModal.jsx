import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../Form';
import { Button, Box } from '@mui/material';
import { EventContext } from '../../contexts/event.context';
import {
  handleNumOfGuestsIncrement,
  handleNumOfGuestsDecrement,
  handlePriceOfGuestIncrement,
  handlePriceOfGuestDecrement,
} from '../utilities/eventUtilities';
import Header from '../Header';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RoomSelectionModal from './roomSelectionModal';

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
    discountBtns,
    openRoomSelectionModal,
    setOpenRoomSelectionModal,
  } = useContext(EventContext);

  const [selectedRoom, setSelectedRoom] = useState('');

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

  console.log(guestsFee);

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
    const newInputValues = [...guestsFee];
    newInputValues[index] = (parseFloat(newInputValues[index]) || 0) + 1;
    const sum = newInputValues.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    setTotal(sum);
    setGuestsFee(newInputValues);
    setInitialInputs(guestsFee);
  };

  const decrementValue = (index) => {
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
            <Header
              modalName={'Dodaj Wydarzenie'}
              setModalOpen={setModalOpen}
              setOverlay={setOverlay}
            />
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
              daysDifference={daysDifference}
              setDaysDifference={setDaysDifference}
            ></Form>
          </Box>

          <div
            className="discount-container"
            style={{
              height: '600px',
              width: '300px',

              overflowY: 'auto',
              borderBottom: `${
                guestsFee.length >= 7 ? '1px solid #a1a1aa' : ''
              } `,
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
                    {discountBtns.map((discountBtn) => (
                      <Button
                        variant="contained"
                        style={{ backgroundColor: discountBtn.bgColor }}
                        className="discount-btn"
                        sx={{ my: 1 }}
                        size="small"
                        onClick={() =>
                          changeValuePercentage(index, discountBtn.value)
                        }
                      >
                        {discountBtn.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {openRoomSelectionModal && <RoomSelectionModal />}
        </div>
      )}
    </>
  );
};

export default AddEventModal;
