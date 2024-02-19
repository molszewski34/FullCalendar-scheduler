import React, { useContext, useEffect } from 'react';
import { EventContext } from '../../contexts/event.context';

const useSearchResults = () => {
  const { events, searchInput, setSearchedEvents, setShowTable } =
    useContext(EventContext);

  useEffect(() => {
    let searchResults = events;

    if (searchInput.trim() !== '') {
      searchResults = events.filter((event) => {
        const titleIncludes = event.title
          .toLowerCase()
          .includes(searchInput.toLowerCase());

        const phoneIncludes = event.extendedProps.phone
          .toString()
          .includes(searchInput.toLowerCase());
        setShowTable(true);

        return titleIncludes || phoneIncludes;
      });

      setSearchedEvents(searchResults);
    } else {
      setSearchedEvents(events);
      setShowTable(false);
    }
  }, [events, searchInput, setSearchedEvents, setShowTable]);
};

export default useSearchResults;
