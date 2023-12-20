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
  const [room, setRoom] = useState('default');
  const [color, setColor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [daysDifference, setDaysDifference] = useState(null);
  const [filteredRoom, setFilteredRoom] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [buttonCount, setButtonCount] = useState(numOfGuests);
  const [guestValue, setGuestValue] = useState(priceOfGuest);
  const [numInputs, setNumInputs] = useState(numOfGuests);
  const [sumOfInputs, setSumOfInputs] = useState(0);
  const [discountValue, setDiscountValue] = useState(0.5);
  const [guestsFee, setGuestsFee] = useState([65]);
  const [initialInputs, setInitialInputs] = useState([65]);
  const [total, setTotal] = useState(65);
  const [cachedEvents, setCachedEvents] = useState([]);

  const [roomsList, setRoomList] = useState([
    {
      name: 'Sypialnia',
      numOfGuests: 2,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #ED213A, #93291E)`,

      defNumOfGuests: 2,
    },
    {
      name: '3 łóżka',
      numOfGuests: 3,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #005C97, #363795)`,

      defNumOfGuests: 3,
    },
    {
      name: '2 łóżka',
      numOfGuests: 2,
      priceOfGuest: 65,
      color: `linear-gradient(to right, #3CA55C, #B5AC49)`,

      defNumOfGuests: 2,
    },
  ]);

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
        buttonCount,
        setButtonCount,
        guestValue,
        setGuestValue,
        numInputs,
        setNumInputs,

        sumOfInputs,
        setSumOfInputs,
        discountValue,
        setDiscountValue,
        guestsFee,
        setGuestsFee,
        total,
        setTotal,
        initialInputs,
        setInitialInputs,
        cachedEvents,
        setCachedEvents,
        roomsList,
        setRoomList,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
