import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Dodane
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';
const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Dodane
  const calendarRef = useRef(null);
  const [events, setEvents] = useState('');

  console.log(events);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };

  async function handleEventAdd(data) {
    await axios.post('/api/calendar/create-event', data.event);
  }

  async function handleDateSet(data) {
    const response = await axios.get(
      '/api/calendar/get-events?start=' +
        moment(data.start).toISOString() +
        '&end=' +
        moment(data.end).toISOString()
    );
    setEvents(response.data);
  }

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // Dodane
          initialView="dayGridMonth"
          ref={calendarRef}
          events={events}
          dateClick={handleDateClick} // Dodane
          // eventAdd={(event) => handleEventAdd(event)}
          eventAdd={handleEventAdd}
          // datesSet={(date) => handleDatesSet(date)}
          datesSet={handleDateSet}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        selectedDate={selectedDate} // Dodane
        onClose={() => {
          setModalOpen(false);
          setSelectedDate(null); // Reset daty po zamknięciu modala
        }}
        onEventAdded={onEventAdded}
      />
    </section>
  );
};

export default Calendar;
