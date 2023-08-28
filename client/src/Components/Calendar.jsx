import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from './AddEventModal';
import Datetime from 'react-datetime';
import axios from 'axios';
import moment from 'moment';

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  console.log(selectedEvent);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };

  const handleEventAdd = async (data) => {
    await axios.post('/api/calendar/create-event', data.event);
  };

  const handleDateSet = async (data) => {
    const response = await axios.get(
      '/api/calendar/get-events?start=' +
        moment(data.start).toISOString() +
        '&end=' +
        moment(data.end).toISOString()
      // data.start.format('YYYY-MM-DD') +
      // '&end=' +
      // data.end.format('YYYY-MM-DD')
    );
    setEvents(response.data);
  };

  const handleEventDelete = async () => {
    if (selectedEvent) {
      await axios.delete(
        `/api/calendar/delete-event/${selectedEvent._def.extendedProps._id}`
      );
      setDeleteConfirmationOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <section>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          ref={calendarRef}
          events={events}
          dateClick={handleDateClick}
          eventAdd={handleEventAdd}
          eventRemove={handleEventDelete}
          datesSet={handleDateSet}
          eventClick={(info) => {
            setSelectedEvent(info.event);
            setDeleteConfirmationOpen(true);
            setOverlay(true);
          }}
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
      />
      {overlay && <div className="overlay"></div>}
      {deleteConfirmationOpen && (
        <div className="delete-confirmation">
          <p>
            Czy jesteś pewien że chcesz{' '}
            <span style={{ color: 'red', fontWeight: 'bold' }}>usunać</span>{' '}
            pobyt {selectedEvent != null && selectedEvent._def.title} w dniach
            od:{' '}
            {selectedEvent != null &&
              moment(selectedEvent._instance.range.start).format(
                'YYYY-MM-DD'
              )}{' '}
            do
            {selectedEvent != null &&
              moment(selectedEvent._instance.range.end).format(
                'YYYY-MM-DD'
              )}{' '}
          </p>
          <div className="delete-confirmation_btn_wrapper">
            <button
              className="delete-confirmation_btn"
              onClick={{ handleEventDelete }}
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
      )}
    </section>
  );
};

export default Calendar;
