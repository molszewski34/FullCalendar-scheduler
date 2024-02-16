import { useContext } from 'react';
import { EventContext } from '../contexts/event.context';
import { axiosInstance } from './axiosConfig';
const useEventAdd = () => {
  const {
    setModalOpen,
    events,
    setEvents,
    setOverlay,
    start,
    end,
    title,
    phone,
    guestsFee,
    numOfGuests,
    priceOfGuest,
    price,
    room,
    color,
    destinationRoomId,
  } = useContext(EventContext);

  const handleEventAdd = async () => {
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
        `/api/events/${destinationRoomId}/create-event`,
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
  return { handleEventAdd };
};

export default useEventAdd;
