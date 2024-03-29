import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { EventContext } from '../contexts/event.context';
import { axiosInstance } from './axiosConfig';

const useFetchRoomsAndEvents = () => {
  const { setRooms, setEvents, isLoading, setIsLoading } =
    useContext(EventContext);

  const { data: roomsData } = useQuery('rooms', () =>
    axiosInstance.get('/api/rooms/get-rooms').then((response) => response.data)
  );

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
      setIsLoading(false);
    }
  }, [roomsData, setRooms]);

  const { data: eventsData, refetch } = useQuery('events', () =>
    axiosInstance
      .get('/api/events/get-events')
      .then((response) => response.data)
  );

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
      setIsLoading(false);
    }
  }, [eventsData, setEvents]);

  return { refetch };
};

export default useFetchRoomsAndEvents;
