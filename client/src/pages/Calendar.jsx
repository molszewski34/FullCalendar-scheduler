import React, { useContext, useEffect, useRef } from 'react';
import 'moment/locale/pl';
import plLocale from '@fullcalendar/core/locales/pl';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from '../Components/modals/AddEventModal';
import DeleteConfirmationModal from '../Components/modals/deleteConfirmationModal';
import EditEventModal from '../Components/modals/EditEventModal';
import { EventContext } from '../contexts/event.context';
import TableBox from '../Components/TableBox';
import ManageRoomsModal from '../Components/modals/ManageRoomsModal';
import useEventChange from '../api/handleEventChange';
import useEventAdd from '../api/handleEventAdd';
import useEventDelete from '../api/handleEventDelete';
import useSearchResults from '../hooks/Calendar/useSearchResults';
import CalendarNavbar from '../Components/CalendarNavbar';
import useEventDidMount from '../hooks/Calendar/useEventDidMount';
import useFetchRoomsAndEvents from '../api/useFetchRoomsAndEvents';
import useHandleDateClick from '../hooks/Calendar/useHandleDateClick';
import useCalculateTotalPrice from '../hooks/Calendar/useCalculateTotalPrice';
import useFilteredEvents from '../hooks/Calendar/useFilteredEvents';
import CircularProgress from '@mui/material/CircularProgress';
import './styles/Calendar.css';
const Calendar = () => {
  const {
    modalOpen,
    setModalOpen,
    selectedDate,
    setSelectedDate,
    overlay,
    setOverlay,
    open,
    setOpen,
    editModalOpen,
    setEditModalOpen,
    editedEvent,
    setEditedEvent,
    showTable,
    openManageRoomsModal,
    setStart,
    setEnd,
    setTitle,
    setPhone,
    setNumOfGuests,
    setPriceOfGuest,
    setGuestsFee,
    setRoom,
    setColor,
    setEventId,
    isLoading,
  } = useContext(EventContext);

  const calendarRef = useRef(null);

  // ** Api hooks
  const { handleEventChange } = useEventChange();
  const { handleEventAdd } = useEventAdd();
  const { handleEventDelete } = useEventDelete();
  //

  // ** Search results hook
  useSearchResults();

  const { handleDateClick } = useHandleDateClick();
  // const { eventClick } = useEventClick();

  useCalculateTotalPrice();

  const { handleEventDidMount } = useEventDidMount();

  const filteredEvents = useFilteredEvents();

  // ** Fetch rooms and events
  useFetchRoomsAndEvents();

  const calendarOptions = {
    contentHeight: 'auto',
  };

  const openEditModal = (event) => {
    setEditedEvent(event);
    setOverlay(true);
    setEditModalOpen(true);
  };

  const eventClick = (info) => {
    // ** eventClick passes states to FullCalendar props to EditEventModal
    const { start, end } = info.event;
    setSelectedDate({ start, end });
    setStart(info.event._instance.range.start);
    setEnd(info.event._instance.range.end);
    setTitle(info.event._instance.range.title);
    setPhone(info.event._def.extendedProps.phone);
    setPriceOfGuest(info.event._def.extendedProps.priceOfGuest);
    setNumOfGuests(info.event._def.extendedProps.numOfGuests);
    setGuestsFee(info.event._def.extendedProps.guestsFee);
    setRoom(info.event._def.extendedProps.room);
    setColor(info.event._def.extendedProps.color);
    setEventId(info.event._def.extendedProps._id);
    setEditModalOpen(true);
    openEditModal(info.event);
  };

  return (
    <main>
      {isLoading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <CalendarNavbar />

      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          locale={plLocale}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          timeZone="Europe/Warsaw"
          displayEventTime={false}
          ref={calendarRef}
          events={filteredEvents}
          dateClick={handleDateClick}
          eventRemove={handleEventDelete}
          eventChange={handleEventChange}
          eventClick={eventClick}
          eventColor="gray"
          eventDidMount={handleEventDidMount}
          slotEventOverlap={false}
          eventOverlap={false}
          {...calendarOptions}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        selectedDate={selectedDate}
        onClose={() => {
          setModalOpen(false);
          setSelectedDate(null);
          setOverlay(false);
        }}
        onEventAdded={handleEventAdd}
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
        handleEventChange={handleEventChange}
        setEditModalOpen={setEditModalOpen}
      />
      {openManageRoomsModal && <ManageRoomsModal />}

      {showTable && <TableBox />}

      {overlay && <div className="overlay"></div>}
    </main>
  );
};

export default Calendar;
