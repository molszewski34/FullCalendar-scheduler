import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from './AddEventModal';

import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pl';
import EditEventModal from './EditEventModal';
import Modal from 'react-modal';
import DateTime from 'react-datetime';
import plLocale from '@fullcalendar/core/locales/pl'; // Import paczki językowej
import { preventDefault } from '@fullcalendar/core/internal';
import { useForm } from 'react-hook-form';
import DeleteConfirmationModal from './deleteConfirmationModal';

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const initialNumOfGuest = editedEvent
    ? editedEvent._def.extendedProps.numOfGuest
    : 2;
  const [editedNumofGuests, setEditedNumOfGuests] = useState(initialNumOfGuest);
  const initialPriceOfGuest = editedEvent
    ? editedEvent._def.extendedProps.priceOfGuest
    : 65;
  const [editedPriceofGuest, setEditedPriceOfGuest] =
    useState(initialPriceOfGuest);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState();
  const [numOfGuests, setNumOfGuests] = useState(2);
  const [priceOfGuest, setPriceOfGuest] = useState(65);
  const [price, setPrice] = useState('');
  const [room, setRoom] = useState('');
  const [roomColor, setRoomColor] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onEventAdded = async (event) => {
    const eventData = {
      title: title,
      start: start,
      end: end,
      extendedProps: {
        phone: phone,
        numOfGuests: numOfGuests,
        priceOfGuest: priceOfGuest,
        price: price,
        room: room,
        roomColor: roomColor,
      },
    };

    try {
      const response = await axios.post(
        '/api/calendar/create-event',
        eventData
      );
      const newEvent = response.data;

      setEvents([...events, newEvent]);
      setModalOpen(false);
    } catch (error) {
      console.error('Błąd podczas dodawania wydarzenia:', error);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setStart(arg.date);
    setEnd(arg.date);
    setModalOpen(true);
  };

  const handleDateSet = async (data) => {
    const response = await axios.get(
      '/api/calendar/get-events?start=' +
        moment(data.start).toISOString() +
        '&end=' +
        moment(data.end).toISOString()
    );
    setEvents(response.data);
  };

  const handleEventDelete = async () => {
    if (editedEvent) {
      await axios.delete(
        `/api/calendar/delete-event/${editedEvent._def.extendedProps._id}`
      );
      setDeleteConfirmationOpen(false);
      setEditedEvent(null);
    }
  };

  const handleEventUpdate = async (e) => {
    // e.preventDefault();
    if (editedEvent) {
      const updatedEventData = {
        start: start.toISOString(),
        end: end.toISOString(),
        title: title,
        extendedProps: {
          phone: phone,
          numOfGuests: numOfGuests,
          priceOfGuest: priceOfGuest,
          price: price,
          room: room,
          roomColor: roomColor,
        },
      };
      await axios.put(
        `/api/calendar/update-event/${editedEvent._def.extendedProps._id}`,
        updatedEventData
      );
      setEditModalOpen(false);
    }
  };

  const openEditModal = (event) => {
    setEditedEvent(event);
    setEditModalOpen(true);
  };

  // console.log(editedEvent);
  const eventClick = (info) => {
    // setEditedEvent(info.event);
    console.log(info);
    const { start, end } = info.event;
    setSelectedDate({ start, end });
    setStart(info.event._instance.range.start);
    setEnd(info.event._instance.range.end);
    // setEditedNumOfGuests(info.event._def.extendedProps.numOfGuests);
    // setEditedPriceOfGuest(info.event._def.extendedProps.priceOfGuest);
    setPriceOfGuest(info.event._def.extendedProps.priceOfGuest);
    setNumOfGuests(info.event._def.extendedProps.numOfGuests);
    setEditModalOpen(true);
    openEditModal(info.event);
  };

  const handleEditedNumOfGuestsIncrement = () => {
    // setEditedNumOfGuests(editedNumofGuests + 1);
    setNumOfGuests(numOfGuests + 1);
  };

  const handleEditedNumOfGuestsDecrement = () => {
    // if (editedNumofGuests > 1) {
    if (numOfGuests > 1) {
      // setEditedNumOfGuests(editedNumofGuests - 1);
      setNumOfGuests(numOfGuests - 1);
    }
  };

  const handlEditedPriceOfGuestIncrement = () => {
    // setEditedPriceOfGuest(editedPriceofGuest + 1);
    // setEditedPriceOfGuest(priceOfGuest + 1);
    setPriceOfGuest(priceOfGuest + 1);
  };

  const handleEditedPriceOfGuestDecrement = () => {
    if (priceOfGuest > 1) {
      // setEditedPriceOfGuest(priceOfGuest - 1);
      setPriceOfGuest(priceOfGuest - 1);
    }
  };

  // useEffect(() => {
  //   const total = editedNumofGuests * editedPriceofGuest;
  //   setPrice(total);
  // }, [editedNumofGuests, editedPriceofGuest]);
  useEffect(() => {
    const total = numOfGuests * priceOfGuest;
    setPrice(total);
  }, [numOfGuests, priceOfGuest]);

  const [selectedRoom, setSelectedRoom] = useState('');

  const roomsList = [
    { name: 'Sypialnia', numOfGuests: 2, priceOfGuest: 65, color: 'red' },
    { name: '3 łóżka', numOfGuests: 3, priceOfGuest: 65, color: 'blue' },
    { name: '2 łóżka', numOfGuests: 2, priceOfGuest: 65, color: 'green' },
  ];

  return (
    <section>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          locale={plLocale}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          ref={calendarRef}
          events={events}
          dateClick={handleDateClick}
          // eventAdd={handleEventAdd}
          // eventAdd={onEventAdded}
          eventRemove={handleEventDelete}
          eventChange={handleEventUpdate}
          datesSet={handleDateSet}
          eventClick={eventClick}
          // eventContent={({ event }) => {
          //   const backgroundColor =
          //     event.extendedProps.room === 'sypialnia'
          //       ? 'red'
          //       : event.extendedProps.room === '2 łóżka'
          //       ? 'green'
          //       : event.extendedProps.room === '3 łóżka'
          //       ? 'blue'
          //       : ''; // Domyślny kolor tła

          //   return <div style={{ backgroundColor }}>{event.title}</div>;
          // }}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        selectedDate={selectedDate}
        onClose={() => {
          setModalOpen(false);
          setSelectedDate(null);
        }}
        onEventAdded={onEventAdded}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        title={title}
        setTitle={setTitle}
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
        roomColor={roomColor}
        setRoomColor={setRoomColor}
      />
      {overlay && <div className="overlay"></div>}
      {/* {deleteConfirmationOpen && (
        <div className="delete-confirmation">
          <div>
            <p>
              {` Czy jesteś pewien że chcesz usunać pobyt
           ${editedEvent != null && editedEvent._def.title} w dniach:`}
            </p>
            <p>
              <b>od:</b>
              {`  ${
                editedEvent != null &&
                moment(editedEvent._instance.range.start).format('YYYY-MM-DD')
              }`}
            </p>
            <p>
              <b> do:</b>
              {`     ${
                editedEvent != null &&
                moment(editedEvent._instance.range.end).format('YYYY-MM-DD')
              }`}
            </p>
          </div>
          <div className="delete-confirmation_btn_wrapper">
            <button
              className="delete-confirmation_btn"
              onClick={handleEventDelete}
              style={{ backgroundColor: 'red' }}
            >
              Usuń
            </button>
            <button
              className="delete-confirmation_btn"
              onClick={() => {
                setDeleteConfirmationOpen(false);
                setOverlay(false);
              }}
              style={{ backgroundColor: 'blue' }}
            >
              Anuluj
            </button>
          </div>
        </div>
      )} */}
      <DeleteConfirmationModal
        deleteConfirmationOpen={deleteConfirmationOpen}
        setDeleteConfirmationOpen={setDeleteConfirmationOpen}
        editedEvent={editedEvent}
        setEditedEvent={setEditedEvent}
        setOverlay={setOverlay}
      />
      {editModalOpen && (
        <div className="modal-edit">
          <form onSubmit={handleSubmit(handleEventUpdate)}>
            <header>
              <h2>Edytuj wydarzenie</h2>
              <button
                className="modal-edit-cancel"
                style={{ backgroundColor: '#38bdf8' }}
                onClick={() => setEditModalOpen(false)}
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
            </div>{' '}
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
    </section>
  );
};

export default Calendar;
