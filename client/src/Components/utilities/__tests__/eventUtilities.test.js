import {
  handleNumOfGuestsIncrement,
  handleNumOfGuestsDecrement,
  handlePriceOfGuestIncrement,
  handlePriceOfGuestDecrement,
} from '../eventUtilities';

const mockSetNumOfGuests = jest.fn();

describe('handleNumOfGuestsIncrement', () => {
  it('increments the number of guests correctly', () => {
    const initialNumOfGuests = 0;

    handleNumOfGuestsIncrement(initialNumOfGuests, mockSetNumOfGuests);

    expect(mockSetNumOfGuests).toHaveBeenCalledWith(initialNumOfGuests + 1);
  });
});

describe('handleNumOfGuestsDecrement', () => {
  it('decrese the number of guests correctly', () => {
    const initialNumOfGuests = 2;

    handleNumOfGuestsDecrement(initialNumOfGuests, mockSetNumOfGuests);

    expect(mockSetNumOfGuests).toHaveBeenCalledWith(initialNumOfGuests - 1);
  });
});

const mockSetPriceOfGuest = jest.fn();

describe('handlePriceOfGuestIncrement', () => {
  it('decrese the number of guests correctly', () => {
    const initialPriceOfGuests = 0;

    handlePriceOfGuestIncrement(initialPriceOfGuests, mockSetPriceOfGuest);

    expect(mockSetPriceOfGuest).toHaveBeenCalledWith(initialPriceOfGuests + 1);
  });
});
describe('handlePriceOfGuestDecrement', () => {
  it('decrese the number of guests correctly', () => {
    const initialPriceOfGuests = 2;

    handlePriceOfGuestDecrement(initialPriceOfGuests, mockSetPriceOfGuest);

    expect(mockSetPriceOfGuest).toHaveBeenCalledWith(initialPriceOfGuests - 1);
  });
});
