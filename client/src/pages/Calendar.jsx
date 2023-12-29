import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'moment/locale/pl';
import plLocale from '@fullcalendar/core/locales/pl';
import SearchIcon from '@mui/icons-material/Search';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from '../Components/AddEventModal';
import DeleteConfirmationModal from '../Components/deleteConfirmationModal';
import EditEventModal from '../Components/EditEventModal';
import { UserContext } from '../contexts/user.context';
import { EventContext } from '../contexts/event.context';
import { FilterRooms } from '../Components/utilities/FilterRooms';
import TableBox from '../Components/TableBox';

const Calendar = () => {
  const calendarRef = useRef(null);

  const {
    modalOpen,
    setModalOpen,
    selectedDate,
    setSelectedDate,
    events,
    setEvents,
    overlay,
    setOverlay,
    open,
    setOpen,
    editModalOpen,
    setEditModalOpen,
    editedEvent,
    setEditedEvent,
    start,
    setStart,
    end,
    setEnd,
    title,
    phone,
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
    daysDifference,
    selectedCategory,
    setSelectedCategory,
    guestsFee,
    setGuestsFee,
    setShowTable,
    searchInput,
    setSearchInput,
    searchedEvents,
    setSearchedEvents,
    showTable,
  } = useContext(EventContext);

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

  useEffect(() => {
    let searchResults = events;

    if (searchInput.trim() !== '') {
      searchResults = events.filter((event) => {
        const titleIncludes = event.title
          .toLowerCase()
          .includes(searchInput.toLowerCase());

        const phoneIncludes = event.extendedProps.phone
          .toString()
          .includes(searchInput.toLowerCase());
        setShowTable(true);

        return titleIncludes || phoneIncludes;
      });

      setSearchedEvents(searchResults);
    } else {
      setSearchedEvents(events);
      setShowTable(false);
    }
  }, [events, searchInput]);

  console.log(searchedEvents);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });

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
        guestsFee: guestsFee,
      },
    };

    try {
      const response = await axiosInstance.post(
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

  const handleEventDelete = async (eventId) => {
    if (editedEvent) {
      const response = await axiosInstance.delete(
        `/api/calendar/delete-event/${editedEvent._def.extendedProps._id}`
      );

      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);

      setOpen(false);
      setOverlay(false);
      setEditedEvent(null);
      window.location.reload();
    }
  };

  const handleEventChange = async (event) => {
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
          guestsFee: guestsFee,
        },
      };

      try {
        const response = await axiosInstance.put(
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
          window.location.reload();
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
    setGuestsFee(info.event._def.extendedProps.guestsFee);
    setRoom(info.event._def.extendedProps.room);
    setColor(info.event._def.extendedProps.color);
    setEditModalOpen(true);
    openEditModal(info.event);
  };

  useEffect(() => {
    const total = numOfGuests * priceOfGuest * daysDifference;
    setPrice(total);
  }, [numOfGuests, priceOfGuest, daysDifference]);

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

  const filteredEvents = events.filter(
    (event) =>
      selectedCategory === '' || event.extendedProps.room === selectedCategory
  );

  const { data: eventsData, refetch } = useQuery('events', () =>
    axiosInstance
      .get('/api/calendar/get-events')
      .then((response) => response.data)
  );

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
    }
  }, [eventsData]);

  const calendarOptions = {
    contentHeight: 'auto',
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchIcon fontSize="large" sx={{ color: 'text.disabled' }} />
            <TextField
              hiddenLabel
              size="small"
              type="text"
              placeholder="Wyszukaj osobę lub telefon"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Box>

          <FilterRooms setSelectedCategory={setSelectedCategory}></FilterRooms>
        </Box>
      </Box>
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
        }}
        onEventAdded={onEventAdded}
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

      {showTable && <TableBox />}

      {overlay && <div className="overlay"></div>}
    </section>
  );
};

export default Calendar;
