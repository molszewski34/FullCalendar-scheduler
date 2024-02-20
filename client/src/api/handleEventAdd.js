import { useContext } from 'react';
import { EventContext } from '../contexts/event.context';
import { useMutation, useQueryClient } from 'react-query';
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
    setIsLoading,
    setTitle,
    setStart,
    setEnd,
    setPhone,
    setNumOfGuests,
    setPriceOfGuest,
    setPrice,
    setRoom,
    setColor,
    setGuestsFee,
  } = useContext(EventContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (eventData) => {
      const response = await axiosInstance.post(
        `/api/events/${destinationRoomId}/create-event`,
        eventData
      );
      return response.data;
    },
    {
      onSuccess: (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setOverlay(false);
        resetStates();

        queryClient.invalidateQueries('events');
      },
    }
  );

  const handleEventAdd = async () => {
    setIsLoading(true);

    const eventData = {
      title,
      start,
      end,
      extendedProps: {
        phone,
        numOfGuests,
        priceOfGuest,
        price,
        room,
        color,
        guestsFee,
      },
    };

    mutation.mutate(eventData);
  };

  const resetStates = () => {
    setTitle('');
    setStart(null);
    setEnd(null);
    setPhone('');
    setNumOfGuests(0);
    setPriceOfGuest(65);
    setPrice(0);
    setRoom('Wybierz pokój');
    setColor('');
    setGuestsFee([65]);
  };

  return { handleEventAdd, isLoading: mutation.isLoading };
};

export default useEventAdd;
