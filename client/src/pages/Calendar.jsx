import React, { useRef, useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from '../Components/AddEventModal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pl';
import plLocale from '@fullcalendar/core/locales/pl';
import DeleteConfirmationModal from '../Components/deleteConfirmationModal';
import EditEventModal from '../Components/EditEventModal';
import { UserContext } from '../contexts/user.context';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import Legend from '../Components/Legend';

const Calendar = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [overlay, setOverlay] = useState(false);

  const [open, setOpen] = React.useState(false);
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
  const [daysDifference, setDaysDifference] = useState(null);

  const { logOutUser } = useContext(UserContext);

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();

      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onEventAdded = async () => {
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
    setModalOpen(true);
    setOverlay(true);
    setSelectedDate(arg.date);
    setStart(arg.date);
    setEnd(arg.date);
  };

  useEffect(() => {
    // Pobierz dane kalendarza z serwera API
    axios.get('/api/calendar/get-events').then((response) => {
      setEvents(response.data);
    });
  }, []);

  const handleEventDelete = async () => {
    if (editedEvent) {
      const response = await axios.delete(
        `/api/calendar/delete-event/${editedEvent._def.extendedProps._id}`
      );
      const deletedEvent = response.data;
      setEvents([deletedEvent]);

      setOpen(false);
      setOverlay(false);
      setEditedEvent(null);
    }
  };

  const handleEventUpdate = async (e) => {
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

      try {
        const response = await axios.put(
          `/api/calendar/update-event/${editedEvent._def.extendedProps._id}`,
          updatedEventData
        );

        if (response.status === 200) {
          calendarRef.current
            .getApi()
            .getEventSourceById(editedEvent.id)
            .remove();

          const updatedEvent = response.data;
          setEvents([updatedEvent]);
          setEditModalOpen(false);
          setOverlay(false);
        } else {
          console.error('Failed to update event');
        }
      } catch (error) {
        console.error('Error updating event:', error);
      }
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
    setPriceOfGuest(info.event._def.extendedProps.priceOfGuest);
    setNumOfGuests(info.event._def.extendedProps.numOfGuests);
    setEditModalOpen(true);
    openEditModal(info.event);
  };

  useEffect(() => {
    const total = numOfGuests * priceOfGuest * daysDifference;
    setPrice(total);
  }, [numOfGuests, priceOfGuest, daysDifference]);

  const [selectedRoom, setSelectedRoom] = useState('');

  const handleEventDidMount = (info) => {
    const backgroundColor = info.event.extendedProps.color || 'gray';

    const el = info.el;
    el.style.background = backgroundColor;
    el.style.fontWeight = 'bold';
    const startDate = new Date(info.event.start);

    const formattedStartDate = ` ${startDate.getHours()}:${String(
      startDate.getMinutes()
    ).padStart(2, '0')}`;
    const dateElement = document.createElement('div');
    dateElement.textContent = `Godzina przyjazdu: ${formattedStartDate}`;
    dateElement.style.color = '#fff';
    dateElement.style.fontWeight = 'bold';
    dateElement.style.marginLeft = '1em';
    info.el.appendChild(dateElement);
  };

  return (
    <section>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="contained" onClick={logOut}>
          Wyloguj
        </Button>
        <Legend />
      </Box>
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
          // datesSet={handleDateSet}
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
        setDaysDifference={setDaysDifference}
        setModalOpen={setModalOpen}
        setEditModalOpen={setEditModalOpen}
        setOverlay={setOverlay}
      />

      <DeleteConfirmationModal
        open={open}
        setOpen={setOpen}
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
        open={open}
        setOpen={setOpen}
        setOverlay={setOverlay}
        setDaysDifference={setDaysDifference}
        setModalOpen={setModalOpen}
      />
      {overlay && <div className="overlay"></div>}
    </section>
  );
};

export default Calendar;
