import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Box, Text } from '@mui/material';
import AddRoom from '../manageRoomsModalComponents/addRoom';
const ManageRoomsModal = () => {
  const { rooms, setRooms } = useContext(EventContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const { data: roomsData, refetch } = useQuery('rooms', () =>
    axiosInstance.get('/api/rooms/get-rooms').then((response) => response.data)
  );

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
    }
  }, [roomsData]);

  const handleRoomButtonClick = (room) => {
    setSelectedRoom(room);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '.5em',
        position: 'fixed',
        zIndex: 2,
        left: '50%',

        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgb(0 0 0 / 0.3)',
        borderRadius: '5px',
        padding: '1em',
        boxShadow:
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

        backgroundColor: '#fff',
        minHeight: '410px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2em',
          flexDirection: 'column',
        }}
      >
        <Box
          style={{
            display: 'flex',
            marginBottom: '1em',
            justifyContent: 'space-between',
          }}
        >
          <h2>Zarządzaj pokojami</h2>
          <Button
            variant="contained"
            style={{
              fontSize: '0.7em',

              fontWeight: 'bold',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Zamknij panel' : 'Dodaj pokój +'}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '0.2em',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '0.2em',
              alignItems: 'self-start',
              borderRight: '1px solid black',
              paddingRight: '.5em',
            }}
          >
            {rooms.map((room) => (
              <Button
                key={room.id}
                size="small"
                variant={selectedRoom === room ? 'contained' : 'outlined'}
                onClick={() => handleRoomButtonClick(room)}
                style={{ fontSize: '0.7em' }}
              >
                {room.roomName}
              </Button>
            ))}
          </Box>

          {selectedRoom ? (
            <Box
              sx={{
                display: 'flex',
                gap: '0.2em',
                flexDirection: 'column',
                fontSize: '0.8em',
                marginLeft: '.5em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ margin: '0' }}>Liczba gości</p>
                <span>{selectedRoom.roomNumOfGuests}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ margin: '0' }}>Cena za osobę</p>
                <span>{selectedRoom.RoomPriceOfGuest}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ margin: '0' }}>Kolor pokoju</p>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: selectedRoom.roomColor,
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ margin: '0' }}>Cena za osobę</p>
                <span>{selectedRoom.RoomPriceOfGuest}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ margin: '0' }}>Lokalizacja</p>
                <span>{selectedRoom.roomLocation}</span>
              </div>
            </Box>
          ) : (
            <p>Wybierz pokój</p>
          )}
        </Box>
      </Box>
      {isOpen && <AddRoom />}
    </Box>
  );
};

export default ManageRoomsModal;
