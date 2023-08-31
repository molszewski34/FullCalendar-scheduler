import React, { useRef, useState } from 'react';
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
  const [title, setTitle] = useState('');
  // const [start, setStart] = useState(new Date());
  const [start, setStart] = useState(null);
  // const [end, setEnd] = useState(new Date());
  const [end, setEnd] = useState(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  console.log(editedEvent);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setStart(arg.date);
    setEnd(arg.date);
    setModalOpen(true);
    console.log(arg.date);
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
    e.preventDefault();
    if (editedEvent) {
      const updatedEventData = {
        title: title,
        start: start.toISOString(),
        end: end.toISOString(),
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

  const eventClick = (info) => {
    setEditedEvent(info.event);
    // setSelectedDate(info.event);
    const { start, end } = info.event;
    setSelectedDate({ start, end });
    setStart(info.event._instance.range.start);
    setEnd(info.event._instance.range.end);
    // setEnd(info.event);
    setEditModalOpen(true);
    openEditModal(info.event);
    // console.log(info.event);
    // setOverlay(true);
  };

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
          eventAdd={handleEventAdd}
          eventRemove={handleEventDelete}
          eventChange={handleEventUpdate}
          datesSet={handleDateSet}
          eventClick={eventClick}
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
        // eventClick={(info) => {
        //   setStart(info.event._instance.range.start);
        //   setEnd(info.event._instance.range.end);
        // }}
      />
      {overlay && <div className="overlay"></div>}
      {deleteConfirmationOpen && (
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
      )}
      {editModalOpen && (
        <div className="modal-edit">
          <form onSubmit={handleEventUpdate}>
            <header>
              <h2>Wydarzenie</h2>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="modal-edit_input">
              <label htmlFor="">Termin przyjazdu:</label>
              <DateTime
                locale="pl"
                value={start}
                placeholder={editedEvent._instance.range.start}
                onChange={(date) => setStart(date)}
              />
            </div>
            <div className="modal-edit_input">
              <label htmlFor="">Termin wyjazdu:</label>
              <DateTime
                value={end}
                placeholder={editedEvent._instance.range.end}
                onChange={(date) => setEnd(date)}
              />
            </div>
            <div className="modal-edit_btn-wrapper">
              <button
                style={{ backgroundColor: '#16a34a' }}
                type="submit"
                onClick={handleEventUpdate}
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
