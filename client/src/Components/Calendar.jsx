import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pl';
import Modal from 'react-modal';
import DateTime from 'react-datetime';
import plLocale from '@fullcalendar/core/locales/pl'; // Import paczki językowej
import { preventDefault } from '@fullcalendar/core/internal';
import { useForm } from 'react-hook-form';
import DeleteConfirmationModal from './deleteConfirmationModal';
import EditEventModal from './EditEventModal';

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
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [numOfGuests, setNumOfGuests] = useState(2);
  const [priceOfGuest, setPriceOfGuest] = useState(65);
  const [price, setPrice] = useState('');
  const [room, setRoom] = useState('');
  const [color, setColor] = useState('');

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
        color: color,
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
      setOverlay(false);
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
      setOverlay(false);
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
          color: color,
        },
      };
      const response = await axios.put(
        `/api/calendar/update-event/${editedEvent._def.extendedProps._id}`,
        updatedEventData
      );
      const updatedEvent = response.data;
      setEvents([updatedEvent]);
      setEditModalOpen(false);
      setOverlay(false);
    }
  };

  const openEditModal = (event) => {
    setEditedEvent(event);
    setOverlay(true);
    setEditModalOpen(true);
  };

  const eventClick = (info) => {
    const { start, end } = info.event;
    setSelectedDate({ start, end });
    setStart(info.event._instance.range.start);
    setEnd(info.event._instance.range.end);
    // setEditedNumOfGuests(info.event._def.extendedProps.numOfGuests);
    // setEditedPriceOfGuest(info.event._def.extendedProps.priceOfGuest);
    setPriceOfGuest(info.event._def.extendedProps.priceOfGuest);
    setNumOfGuests(info.event._def.extendedProps.numOfGuests);
    setEditModalOpen(true);
    setOverlay(true);
    openEditModal(info.event);
  };

  useEffect(() => {
    const total = numOfGuests * priceOfGuest;
    setPrice(total);
  }, [numOfGuests, priceOfGuest]);

  const [selectedRoom, setSelectedRoom] = useState('');

  const handleEventDidMount = (info) => {
    const backgroundColor = info.event.extendedProps.color || 'gray';

    const el = info.el;
    el.style.backgroundColor = backgroundColor;
    // el.style.padding = '0.3em .5em .5em .5em';
    el.style.fontWeight = 'bold';
    const startDate = new Date(info.event.start);
    const endDate = new Date(info.event.end);

    const formattedStartDate = ` ${startDate.getHours()}:${String(
      startDate.getMinutes()
    ).padStart(2, '0')}`;
    const dateElement = document.createElement('div');
    dateElement.textContent = `Godzina przyjazdu: ${formattedStartDate}`;
    dateElement.style.color = 'white';
    dateElement.style.fontWeight = 'normal';
    info.el.appendChild(dateElement);
  };

  // console.log(events);
  // console.log(end);

  return (
    <section>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          locale={plLocale}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          timeZone="Europe/Warsaw"
          displayEventTime={false}
          ref={calendarRef}
          events={events}
          dateClick={handleDateClick}
          eventRemove={handleEventDelete}
          eventChange={handleEventUpdate}
          datesSet={handleDateSet}
          eventClick={eventClick}
          eventColor="gray"
          eventDidMount={handleEventDidMount}
          slotEventOverlap={false}
          eventOverlap={false}
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
        color={color}
        setColor={setColor}
      />
      {overlay && <div className="overlay"></div>}
      <DeleteConfirmationModal
        deleteConfirmationOpen={deleteConfirmationOpen}
        setDeleteConfirmationOpen={setDeleteConfirmationOpen}
        editedEvent={editedEvent}
        setEditedEvent={setEditedEvent}
        setOverlay={setOverlay}
        handleEventDelete={handleEventDelete}
      />
      <EditEventModal
        editModalOpen={editModalOpen}
        handleEventUpdate={handleEventUpdate}
        setEditModalOpen={setEditModalOpen}
        editedEvent={editedEvent}
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
        room={room}
        setRoom={setRoom}
        setColor={setColor}
        setSelectedRoom={setSelectedRoom}
        price={price}
        setPrice={setPrice}
        setDeleteConfirmationOpen={setDeleteConfirmationOpen}
        setOverlay={setOverlay}
      />
    </section>
  );
};

export default Calendar;
