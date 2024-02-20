import { useContext } from 'react';
import { axiosInstance } from './axiosConfig';
import { useMutation, useQueryClient } from 'react-query';
import { EventContext } from '../contexts/event.context';

const useEventDelete = () => {
  const {
    events,
    setEvents,
    setOpen,
    setOverlay,
    setEditedEvent,
    roomId,
    eventId,
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
    async () => {
      const response = await axiosInstance.delete(
        `/api/events/${roomId}/delete-event/${eventId}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        setOpen(false);
        setOverlay(false);
        setEditedEvent(null);
        resetStates(); // Resetting states after updating events
        queryClient.invalidateQueries('events');
      },
      onError: (error) => {
        console.error('Error deleting event:', error);
      },
    }
  );

  const handleEventDelete = async () => {
    setIsLoading(true);

    // if (roomId && events) {
    //   try {
    //     await mutation.mutateAsync();
    //   } catch (error) {
    //     console.error('Error deleting event:', error);
    //   }
    // }
    mutation.mutate();
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

  return { handleEventDelete, isLoading: mutation.isLoading };
};

export default useEventDelete;
