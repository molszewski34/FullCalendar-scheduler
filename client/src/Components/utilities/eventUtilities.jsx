// AddEventModal

export const handleNumOfGuestsIncrement = (numOfGuests, setNumOfGuests) => {
  setNumOfGuests(numOfGuests + 1);
};

export const handleNumOfGuestsDecrement = (numOfGuests, setNumOfGuests) => {
  if (numOfGuests > 1) {
    setNumOfGuests(numOfGuests - 1);
  }
};

export const handlePriceOfGuestIncrement = (priceOfGuest, setPriceOfGuest) => {
  setPriceOfGuest(priceOfGuest + 1);
};

export const handlePriceOfGuestDecrement = (priceOfGuest, setPriceOfGuest) => {
  if (priceOfGuest > 1) {
    setPriceOfGuest(priceOfGuest - 1);
  }
};

// EditEventModal

export const handleEditedNumOfGuestsIncrement = (
  setNumOfGuests,
  numOfGuests
) => {
  setNumOfGuests(numOfGuests + 1);
};

export const handleEditedNumOfGuestsDecrement = (
  setNumOfGuests,
  numOfGuests
) => {
  if (numOfGuests > 1) {
    setNumOfGuests(numOfGuests - 1);
  }
};

export const handlEditedPriceOfGuestIncrement = (
  setPriceOfGuest,
  priceOfGuest
) => {
  setPriceOfGuest(priceOfGuest + 1);
};

export const handleEditedPriceOfGuestDecrement = (
  setPriceOfGuest,
  priceOfGuest
) => {
  if (priceOfGuest > 1) {
    setPriceOfGuest(priceOfGuest - 1);
  }
};
