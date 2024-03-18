import React from 'react';
import { render } from '@testing-library/react';
import AccordionComponent from '../accordionComponent';
import { EventProvider } from '../../../contexts/event.context';

const mockContextValue = {
  rooms: [
    { roomNumOfGuests: 3, roomName: 'Room 3' },
    { roomNumOfGuests: 1, roomName: 'Room 1' },
    { roomNumOfGuests: 2, roomName: 'Room 2' },
  ],
};

describe('AccordionComponent', () => {
  test('rooms are sorted correctly', () => {
    const {} = render(
      <EventProvider value={mockContextValue}>
        <AccordionComponent />
      </EventProvider>
    );
    const sortedRooms = mockContextValue.rooms.sort(
      (a, b) => a.roomNumOfGuests - b.roomNumOfGuests
    );
    const expectedSortedRooms = [
      { roomNumOfGuests: 1, roomName: 'Room 1' },
      { roomNumOfGuests: 2, roomName: 'Room 2' },
      { roomNumOfGuests: 3, roomName: 'Room 3' },
    ];

    expect(sortedRooms).toEqual(expectedSortedRooms);
  });

  test('should return "łóżka" for 1 guest', () => {
    const sortedRooms = [{ roomNumOfGuests: 1 }];
    const result = [
      ...new Set(sortedRooms.map((room) => room.roomNumOfGuests)),
    ].map((uniqueRoomNumOfGuests, index) => {
      let word = 'łóżek';
      if (uniqueRoomNumOfGuests === 1) {
        word = 'łóżko';
      } else if (
        uniqueRoomNumOfGuests % 10 >= 2 &&
        uniqueRoomNumOfGuests % 10 <= 4 &&
        (uniqueRoomNumOfGuests % 100 < 10 || uniqueRoomNumOfGuests % 100 >= 20)
      ) {
        word = 'łóżka';
      }
      return word;
    });
    expect(result).toEqual(['łóżko']);
  });
  test('should return "łóżek" for 5 guests', () => {
    const sortedRooms = [{ roomNumOfGuests: 5 }];
    const result = [
      ...new Set(sortedRooms.map((room) => room.roomNumOfGuests)),
    ].map((uniqueRoomNumOfGuests, index) => {
      let word = 'łóżek';
      if (uniqueRoomNumOfGuests === 1) {
        word = 'łóżko';
      } else if (
        uniqueRoomNumOfGuests % 10 >= 2 &&
        uniqueRoomNumOfGuests % 10 <= 4 &&
        (uniqueRoomNumOfGuests % 100 < 10 || uniqueRoomNumOfGuests % 100 >= 20)
      ) {
        word = 'łóżka';
      }
      return word;
    });
    expect(result).toEqual(['łóżek']);
  });
  test('should return "łóżka" for 4 guests', () => {
    const sortedRooms = [{ roomNumOfGuests: 4 }];
    const result = [
      ...new Set(sortedRooms.map((room) => room.roomNumOfGuests)),
    ].map((uniqueRoomNumOfGuests, index) => {
      let word = 'łóżek';
      if (uniqueRoomNumOfGuests === 1) {
        word = 'łóżko';
      } else if (
        uniqueRoomNumOfGuests % 10 >= 2 &&
        uniqueRoomNumOfGuests % 10 <= 4 &&
        (uniqueRoomNumOfGuests % 100 < 10 || uniqueRoomNumOfGuests % 100 >= 20)
      ) {
        word = 'łóżka';
      }
      return word;
    });
    expect(result).toEqual(['łóżka']);
  });
});
