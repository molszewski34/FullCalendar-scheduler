import { useContext, useRef } from 'react';
import axios from 'axios';
import { EventContext } from '../contexts/event.context';
import { useMutation, useQueryClient } from 'react-query';

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
    setIsLoading,
    setEvents,
    setEditModalOpen,
    setOverlay,
  } = useContext(EventContext);

  const calendarRef = useRef(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (updatedEventData) => {
      const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_PUBLIC_API_URL,
      });

      const response = await axiosInstance.put(
        `/api/events/${roomId}/update-event/${eventId}/move`,
        updatedEventData
      );

      return response.data;
    },
    {
      onSuccess: () => {
        // const { message } = data;
        // console.log(message);
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        setEditModalOpen(false);
        setOverlay(false);

        queryClient.invalidateQueries('events');
      },
      onError: (error) => {
        console.error('Error moving event:', error);
      },
    }
  );

  const handleEventChange = async () => {
    setIsLoading(true);
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

    mutation.mutate(updatedEventData);
  };

  return { handleEventChange, isLoading: mutation.isLoading };
};

export default useEventChange;
