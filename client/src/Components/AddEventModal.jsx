import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTime from 'react-datetime';
import { useForm } from 'react-hook-form';

const AddEventModal = ({
  isOpen,
  onClose,
  onEventAdded,
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
  roomColor,
  setRoomColor,
}) => {
  const [selectedRoom, setSelectedRoom] = useState('');

  const roomsList = [
    { name: 'Sypialnia', numOfGuests: 2, priceOfGuest: 65, color: 'red' },
    { name: '3 łóżka', numOfGuests: 3, priceOfGuest: 65, color: 'blue' },
    { name: '2 łóżka', numOfGuests: 2, priceOfGuest: 65, color: 'green' },
  ];

  // console.log(roomsList);
  useEffect(() => {
    const total = numOfGuests * priceOfGuest;
    setPrice(total);
  }, [numOfGuests, priceOfGuest]);

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

  const onSubmit = (event) => {
    // event.preventDefault();
    onEventAdded({
      start,
      end,
      title,
      phone,
      numOfGuests,
      priceOfGuest,
      price,
      room,
      roomColor,
    });
    onClose();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // register('room', { required: true, validate: (value) => value !== '' });

  return (
    <>
      {isOpen && (
        <div className="modal-edit" isOpen={isOpen}>
          <header>
            <h2>Dodaj wydarzenie</h2>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <form onSubmit={onSubmit}> */}
            <div className="">
              <input
                placeholder="Imię Nazwisko"
                {...register(
                  'title',
                  { required: true, minLength: 1, maxLength: 20 },
                  { pattern: /^[A-Za-z]+$/i }
                )}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="error">Pole jest wymagane</p>}
              {errors.title && errors.title.type === 'pattern' && (
                <p className="error">Tytuł nie może zawierać liczb</p>
              )}
              {errors.title && errors.title.type === 'minLength' && (
                <p className="error">Tytuł nie może być pusty</p>
              )}
            </div>
            <div className="">
              <label htmlFor="">Przyjazd</label>
              <DateTime value={start} onChange={(date) => setStart(date)} />
            </div>
            <div className="">
              <label htmlFor="">Wyjazd</label>
              <DateTime value={end} onChange={(date) => setEnd(date)} />
            </div>

            <div className="modal-edit_input">
              <label htmlFor="">Telefon:</label>
              <input
                placeholder="np. 500123456"
                {...register('phone', {
                  required: true,
                  pattern: /^[0-9]+$/,
                  minLength: 9, // Minimalna długość numeru
                  maxLength: 15, // Maksymalna długość numeru
                })}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && errors.phone.type === 'required' && (
                <p className="error">Pole jest wymagane</p>
              )}
              {errors.phone && errors.phone.type === 'pattern' && (
                <p className="error">Pole może zawierać tylko cyfry</p>
              )}
              {errors.phone && errors.phone.type === 'minLength' && (
                <p className="error">Numer telefonu jest za krótki</p>
              )}
              {errors.phone && errors.phone.type === 'maxLength' && (
                <p className="error">Numer telefonu jest za długi</p>
              )}
            </div>

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
                {errors.priceOfGuest &&
                  errors.priceOfGuest.type === 'required' && (
                    <p className="error">Pole jest wymagane</p>
                  )}
                {errors.priceOfGuest && errors.priceOfGuest.type === 'min' && (
                  <p className="error">Minimalnie 1 zł</p>
                )}
              </div>
            </div>

            <div>
              <header>Wybierz pokój</header>
              <div className="">
                {roomsList.map((roomItem, index) => (
                  <button
                    type="button"
                    className={`room-button ${
                      room === roomItem.name ? 'selected' : ''
                    }`}
                    style={{ backgroundColor: roomItem.color }}
                    key={index}
                    onClick={() => {
                      setRoom(roomItem.name);
                      setRoomColor(roomItem.color);
                      setNumOfGuests(roomItem.numOfGuests);
                      setPriceOfGuest(roomItem.priceOfGuest);
                      setSelectedRoom(roomItem.name);
                    }}
                  >
                    {roomItem.name}
                  </button>
                ))}
              </div>
              {errors.room && <p className="error">Wybierz jeden z pokoi</p>}
            </div>

            <div className="">{`Do zapłaty: ${price} zł`}</div>

            <button type="submit">Add event</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddEventModal;
