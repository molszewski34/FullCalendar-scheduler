import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField, Box, InputAdornment } from '@mui/material';

import { useQuery } from 'react-query';
import axios from 'axios';
import 'moment/locale/pl';
import plLocale from '@fullcalendar/core/locales/pl';
import SearchIcon from '@mui/icons-material/Search';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from '../Components/modals/AddEventModal';
import DeleteConfirmationModal from '../Components/modals/DeleteConfirmationModal';
import EditEventModal from '../Components/modals/EditEventModal';
import { UserContext } from '../contexts/user.context';
import { EventContext } from '../contexts/event.context';
import { FilterRooms } from '../Components/utilities/FilterRooms';
import TableBox from '../Components/TableBox';
import ManageRoomsModal from '../Components/modals/ManageRoomsModal';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useEventChange from '../api/handleEventChange';
import useEventAdd from '../api/handleEventAdd';
import useEventDelete from '../api/handleEventDelete';
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
    setTitle,
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
    setSearchedEvents,
    showTable,
    openManageRoomsModal,
    setOpenManageRoomsModal,
    setRooms,
    roomId,
    rooms,
    setRoomId,
    setEventId,
    setDestinationRoomId,
  } = useContext(EventContext);

  // ** Api hooks
  const { handleEventChange } = useEventChange();
  const { handleEventAdd } = useEventAdd();
  const { handleEventDelete } = useEventDelete();
  //

  // ** Login/LogOut
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

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });

  const handleDateClick = (arg) => {
    setModalOpen(true);
    setOverlay(true);
    setSelectedDate(arg.date);
    setStart(arg.date);
    setEnd(arg.date);
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
    dateElement.textContent = ` ${info.event.extendedProps.room}`;
    dateElement.style.color = '#e2e8f0';
    dateElement.style.fontWeight = 'bold';
    dateElement.style.marginLeft = '1em';
    info.el.appendChild(dateElement);
  };

  const filteredEvents = events.filter(
    (event) =>
      selectedCategory === '' || event.extendedProps.room === selectedCategory
  );

  const { data: roomsData } = useQuery('rooms', () =>
    axiosInstance.get('/api/rooms/get-rooms').then((response) => response.data)
  );

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
    }
  }, [roomsData]);

  const { data: eventsData, refetch } = useQuery('events', () =>
    axiosInstance
      .get('/api/events/get-events')
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

  console.log(`roomId ${roomId}`);

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
            position: 'relative',
          }}
        >
          <Button variant="contained" onClick={logOut}>
            Wyloguj
          </Button>
          <Button
            variant="contained"
            startIcon={<ManageAccountsIcon />}
            onClick={() => setOpenManageRoomsModal(!openManageRoomsModal)}
            color="secondary"
          >
            Zarządzaj pokojami
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
            position: 'relative',
          }}
        >
          <Box
            fullWidth
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              hiddenLabel
              size="small"
              type="text"
              placeholder="Wyszukaj osobę..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
                sx: { pr: '24px' },
                placeholderTypographyProps: { fontSize: '0.6em' },
              }}
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
