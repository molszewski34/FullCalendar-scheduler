import { useContext, useEffect } from 'react';
import { EventContext } from '../../contexts/event.context';

const useCalculateTotalPrice = () => {
  const { numOfGuests, priceOfGuest, daysDifference, setPrice } =
    useContext(EventContext);

  useEffect(() => {
    const total = numOfGuests * priceOfGuest * daysDifference;
    setPrice(total);
  }, [numOfGuests, priceOfGuest, daysDifference, setPrice]);
};

export default useCalculateTotalPrice;
