import { useContext } from 'react';
import { EventContext } from '../../contexts/event.context';

const useFilteredEvents = () => {
  const { events, selectedCategory } = useContext(EventContext);

  const filteredEvents = events.filter(
    (event) =>
      selectedCategory === '' || event.extendedProps.room === selectedCategory
  );

  return filteredEvents;
};

export default useFilteredEvents;
