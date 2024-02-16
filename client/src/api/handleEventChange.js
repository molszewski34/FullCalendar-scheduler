import { useContext, useRef } from 'react';
import axios from 'axios';
import { EventContext } from '../contexts/event.context';

const useEventChange = () => {
  const {
    start,
    end,
    title,
    phone,
    numOfGuests,
    priceOfGuest,
    price,
    room,
    color,
    guestsFee,
    roomId,
    eventId,
    destinationRoomId,
  } = useContext(EventContext);

  const calendarRef = useRef(null);

  const handleEventChange = async () => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_PUBLIC_API_URL,
    });

    const updatedEventData = {
      destinationRoomId: destinationRoomId,
      updatedEventData: {
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
      },
    };

    try {
      const response = await axiosInstance.put(
        `/api/events/${roomId}/update-event/${eventId}/move`,
        updatedEventData
      );

      if (response.status === 200) {
        const { message } = response.data;
        console.log(message);
      } else {
        console.error('Failed to move event');
      }
    } catch (error) {
      console.error('Error moving event:', error);
    }
  };

  return { handleEventChange };
};

export default useEventChange;
