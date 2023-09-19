import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DateTime from 'react-datetime';
import axios from 'axios';

const EditEventModal = ({
  editModalOpen,
  setEditModalOpen,
  handleEventUpdate,
  editedEvent,
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
  room,
  setRoom,
  setColor,
  setSelectedRoom,
  price,
  setPrice,
  setDeleteConfirmationOpen,
  setOverlay,
}) => {
  const roomsList = [
    { name: 'Sypialnia', numOfGuests: 2, priceOfGuest: 65, color: 'red' },
    { name: '3 łóżka', numOfGuests: 3, priceOfGuest: 65, color: 'blue' },
    { name: '2 łóżka', numOfGuests: 2, priceOfGuest: 65, color: 'green' },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleEditedNumOfGuestsIncrement = () => {
    setNumOfGuests(numOfGuests + 1);
  };

  const handleEditedNumOfGuestsDecrement = () => {
    if (numOfGuests > 1) {
      setNumOfGuests(numOfGuests - 1);
    }
  };

  const handlEditedPriceOfGuestIncrement = () => {
    setPriceOfGuest(priceOfGuest + 1);
  };

  const handleEditedPriceOfGuestDecrement = () => {
    if (priceOfGuest > 1) {
      setPriceOfGuest(priceOfGuest - 1);
    }
  };

  useEffect(() => {
    const total = numOfGuests * priceOfGuest;
    setPrice(total);
  }, [numOfGuests, priceOfGuest]);
  return (
    <div>
      {editModalOpen && (
        <div className="modal-edit">
          <form onSubmit={handleSubmit(handleEventUpdate)}>
            <header>
              <h2>Edytuj wydarzenie</h2>
              <button
                className="modal-edit-cancel"
                style={{ backgroundColor: '#38bdf8' }}
                onClick={() => {
                  setEditModalOpen(false);
                  setOverlay(false);
                }}
              >
                Anuluj
              </button>
            </header>
            <div className="modal-edit_input">
              <label htmlFor="">Tytuł:</label>
              <input
                placeholder={editedEvent._def.title}
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
            <div className="modal-edit_input">
              <label htmlFor="">Telefon:</label>
              <input
                placeholder={editedEvent._def.extendedProps.phone}
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
            <div className="modal-edit_input">
              <label htmlFor="">Przyjazd:</label>
              <DateTime
                locale="pl"
                value={start}
                placeholder={editedEvent._instance.range.start}
                onChange={(date) => setStart(date)}
              />
            </div>
            <div className="modal-edit_input">
              <label htmlFor="">Wyjazd:</label>
              <DateTime
                value={end}
                placeholder={editedEvent._instance.range.end}
                onChange={(date) => setEnd(date)}
              />
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
                      setColor(roomItem.color);
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
            <p>Obecny pokój : {editedEvent._def.extendedProps.room}</p>
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
                    // value={editedNumofGuests}
                    value={numOfGuests}
                    placeholder={editedEvent._def.extendedProps.numOfGuests}
                    onChange={(e) => setNumOfGuests(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleEditedNumOfGuestsDecrement}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={handleEditedNumOfGuestsIncrement}
                  >
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
                    // value={editedPriceofGuest}
                    value={priceOfGuest}
                    onChange={(e) => setPriceOfGuest(e.target.value)}
                    placeholder={editedEvent._def.extendedProps.priceOfGuest}
                  />
                  <button
                    type="button"
                    onClick={handleEditedPriceOfGuestDecrement}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={handlEditedPriceOfGuestIncrement}
                  >
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

            <div className="">{`Do zapłaty: ${price} zł`}</div>

            <div className="modal-edit_btn-wrapper">
              <button
                style={{ backgroundColor: '#16a34a' }}
                type="submit"
                // onClick={handleEventUpdate}
              >
                Zapisz
              </button>
              <button
                style={{ backgroundColor: '#ef4444' }}
                onClick={() => {
                  setDeleteConfirmationOpen(true);
                  setEditModalOpen(false);
                }}
              >
                Usuń
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditEventModal;
