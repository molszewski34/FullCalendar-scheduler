import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventProvider } from '../../../contexts/event.context';
import RoomSelectionModal from '../roomSelectionModal';

test('renders buttons correctly with data from context', async () => {
  const rooms = [
    {
      _id: '65a4e49f06a089fac27137fc',
      roomName: 'Testowy pokój 1',
      roomNumOfGuests: 4,
      RoomPriceOfGuest: 65,
    },
    {
      _id: '65a4e74b06a089fac2713819',
      roomName: 'Sypialnia',
      roomNumOfGuests: 2,
      RoomPriceOfGuest: 65,
    },
  ];

  const contextWrapper = ({ children }) => (
    <EventProvider buttonsData={rooms}>{children}</EventProvider>
  );

  const { findByText } = render(<RoomSelectionModal />, {
    wrapper: contextWrapper,
  });

  rooms.forEach(async (buttonText) => {
    const button = await findByText(buttonText.roomName);
    expect(button).toBeInTheDocument();
  });
});

test('when clicked on button states setRoom, setPriceOfGuest, setNumOfGuests are set to values passed from responding values from room Object', async () => {
  const setRoom = jest.fn();

  const setPriceOfGuest = jest.fn();
  const setNumOfGuests = jest.fn();
  const rooms = [
    {
      _id: '65a4e74b06a089fac2713819',
      roomName: 'Sypialnia',
      roomNumOfGuests: 2,
      RoomPriceOfGuest: 65,
    },
  ];

  const contextValues = {
    setRoom,
    setPriceOfGuest,
    setNumOfGuests,
    rooms,
  };

  const contextWrapper = ({ children }) => (
    <EventProvider values={contextValues}>{children}</EventProvider>
  );

  const { findByText } = render(<RoomSelectionModal />, {
    wrapper: contextWrapper,
  });

  rooms.forEach(async (buttonText) => {
    fireEvent.click(await findByText(buttonText.roomName));

    expect(setRoom).toHaveBeenCalledWith(rooms.roomName);
    expect(setPriceOfGuest).toHaveBeenCalledWith(rooms.RoomPriceOfGuest);
    expect(setNumOfGuests).toHaveBeenCalledWith(rooms.roomNumOfGuests);
  });
});

describe('generateInputs', () => {
  const rooms = [
    {
      _id: '65a4e74b06a089fac2713819',
      roomName: 'Sypialnia',
      roomNumOfGuests: 2,
      RoomPriceOfGuest: 65,
    },
  ];

  const setGuestsFee = jest.fn();
  const setInitialInputs = jest.fn();
  const setTotal = jest.fn();

  const contextValues = {
    setGuestsFee,
    setInitialInputs,
    setTotal,
    rooms,
  };

  const contextWrapper = ({ children }) => (
    <EventProvider values={contextValues}>{children}</EventProvider>
  );
  const { findByText } = render(<RoomSelectionModal />, {
    wrapper: contextWrapper,
  });

  it('tests if setGuestsFee, setInitialInputs have been called with proper values from generateInputs(room.roomNumOfGuests, room.RoomPriceOfGuest)', () => {
    const mockGenerateInputs = jest.fn();

    rooms.forEach(async (buttonText) => {
      fireEvent.click(await findByText(buttonText.roomName), {
        room,
        setOpenRoomSelectionModal: jest.fn(),
        generateInputs: mockGenerateInputs,
      });

      expect(mockGenerateInputs).toHaveBeenCalledWith(
        room.roomNumOfGuests,
        room.RoomPriceOfGuest
      );
    });
  });
  it('tests if setTotal have expected value', async () => {
    const mockGenerateInputs = jest.fn();

    rooms.forEach(async (buttonText) => {
      fireEvent.click(await findByText(buttonText.roomName), {
        room,
        setOpenRoomSelectionModal: jest.fn(),
        generateInputs: mockGenerateInputs,
      });
      const expectedTotal =
        buttonText.roomNumOfGuests * buttonText.RoomPriceOfGuest;

      expect(mockGenerateInputs).toHaveBeenCalledWith(expectedTotal);
    });
  });
});
