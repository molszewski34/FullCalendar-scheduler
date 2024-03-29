import { useState, createContext } from 'react';
import React from 'react';
export const EventContext = createContext();

export function EventProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const [roomSelection, setRoomSelection] = useState('');
  const [rooms, setRooms] = useState([]);
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
  const [price, setPrice] = useState(0);
  const [room, setRoom] = useState('Wybierz pokój');
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
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [roomId, setRoomId] = useState(roomSelection._id);
  const [eventId, setEventId] = useState('');
  const [openManageRoomsModal, setOpenManageRoomsModal] = useState(false);
  const [openRoomSelectionModal, setOpenRoomSelectionModal] = useState(false);
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [openEditRoomPanel, setOpenEditRoomPanel] = useState(false);
  const [openAddRoomPanel, setOpenAddRoomPanel] = useState(false);
  const [openDeleteRoomPanel, setOpenDeleteRoomPanel] = useState(false);
  const [chossenRoom, setChossenRoom] = useState('');
  const [destinationRoomId, setDestinationRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [openAddRoomEquipmentModal, setOpenAddRoomEquipmentModal] =
    useState(false);
  const [openEditRoomEquipmentModal, setOpenEditRoomEquipmentModal] =
    useState(false);
  const [addSelectedEquipment, setAddSelectedEquipment] = useState([]);
  const [editSelectedEquipment, setEditSelectedEquipment] = useState([]);

  const [discountBtns, setDiscountBtns] = useState([
    { name: '50%', value: -50, bgColor: '#009688' },
    { name: '25%', value: -25, bgColor: '#03a9f4' },
    { name: '10%', value: -10, bgColor: '#00bcd4' },
  ]);

  const [equipmentList, setEquipmentList] = useState([
    { name: 'Lodówka', icon: 'kitchen' },
    { name: 'Mikrofalówka', icon: 'microwave' },
    { name: 'Prysznic', icon: 'shower' },
    { name: 'Wanna', icon: 'bathtub' },
    { name: 'Grill', icon: 'outdoor_grill' },
    { name: 'Telewizor', icon: 'tv' },
    { name: 'Aneks Kuchenny', icon: 'countertops' },
    { name: 'Dodatkowe łóżko', icon: 'bed' },
    { name: 'Szafka', icon: 'checkroom' },
    { name: 'Łazienka', icon: 'bathroom' },
    { name: 'Plac', icon: 'yard' },
    { name: 'Wifi', icon: 'wifi' },
    { name: 'Telefon', icon: 'phone' },
    { name: 'Obsługa', icon: 'room_service' },
  ]);

  return (
    <EventContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        selectedDate,
        setSelectedDate,
        rooms,
        setRooms,
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
        discountBtns,
        setDiscountBtns,
        searchInput,
        setSearchInput,
        searchedEvents,
        setSearchedEvents,
        showTable,
        setShowTable,
        roomSelection,
        setRoomSelection,
        roomId,
        setRoomId,
        openManageRoomsModal,
        setOpenManageRoomsModal,
        openRoomSelectionModal,
        setOpenRoomSelectionModal,
        isRoomSelected,
        setIsRoomSelected,
        eventId,
        setEventId,
        showColorPicker,
        setShowColorPicker,
        openEditRoomPanel,
        setOpenEditRoomPanel,
        openAddRoomPanel,
        setOpenAddRoomPanel,
        openDeleteRoomPanel,
        setOpenDeleteRoomPanel,
        chossenRoom,
        setChossenRoom,
        destinationRoomId,
        setDestinationRoomId,
        isLoading,
        setIsLoading,
        openAddRoomEquipmentModal,
        setOpenAddRoomEquipmentModal,
        openEditRoomEquipmentModal,
        setOpenEditRoomEquipmentModal,
        addSelectedEquipment,
        setAddSelectedEquipment,
        equipmentList,
        setEquipmentList,
        editSelectedEquipment,
        setEditSelectedEquipment,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
