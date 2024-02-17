import { useContext } from 'react';
import { axiosInstance } from './axiosConfig';
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
  } = useContext(EventContext);

  console.log(`eventId ${eventId}`);

  const handleEventDelete = async () => {
    if (roomId && events) {
      try {
        const response = await axiosInstance.delete(
          `/api/events/${roomId}/delete-event/${eventId}`
        );

        if (response.status === 200) {
          const updatedEvents = events.filter((event) => event.id !== eventId);
          setEvents(updatedEvents);

          setOpen(false);
          setOverlay(false);
          setEditedEvent(null);
          window.location.reload(); // This could be improved
        } else {
          console.error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return { handleEventDelete };
};

export default useEventDelete;
