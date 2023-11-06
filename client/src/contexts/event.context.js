import { useState, createContext } from 'react';
import React from 'react';

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });

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
  const [selectedRoom, setSelectedRoom] = useState('');
  const [daysDifference, setDaysDifference] = useState(null);
  const [filteredRoom, setFilteredRoom] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
    <EventContext.Provider
      value={{
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
        setDaysDifference,
        selectedRoom,
        setSelectedRoom,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
