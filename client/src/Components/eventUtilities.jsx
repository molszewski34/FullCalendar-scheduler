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
