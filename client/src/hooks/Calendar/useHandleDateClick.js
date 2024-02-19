import { useContext } from 'react';
import { EventContext } from '../../contexts/event.context';

const useHandleDateClick = () => {
  const { setModalOpen, setOverlay, setSelectedDate, setStart, setEnd } =
    useContext(EventContext);

  const handleDateClick = (arg) => {
    setModalOpen(true);
    setOverlay(true);
    setSelectedDate(arg.date);
    setStart(arg.date);
    setEnd(arg.date);
  };

  return { handleDateClick };
};

export default useHandleDateClick;
