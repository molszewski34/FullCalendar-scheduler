import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Box, Text, Typography } from '@mui/material';
import AddRoom from '../manageRoomsModalComponents/addRoom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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

  const roomDetailsData = selectedRoom
    ? [
        { label: 'Nazwa pokoju:', value: selectedRoom.roomName },
        { label: 'Liczba miejsc:', value: selectedRoom.roomNumOfGuests },
        { label: 'Cena za osobę:', value: selectedRoom.RoomPriceOfGuest },
        { label: 'Kolor pokoju:', value: selectedRoom.roomColor },
        { label: 'Lokalizacja:', value: selectedRoom.roomLocation },
      ]
    : [];

  console.log(rooms);

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
          <b>Zarządzaj pokojami</b>
          <Button
            variant="contained"
            style={{
              fontSize: '.7em',

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
                onClick={() => handleRoomButtonClick(room)}
                style={{
                  fontSize: '0.7em',

                  border:
                    selectedRoom === room
                      ? '1px solid #6b7280'
                      : '1px solid #d1d5db',
                  color: '#6b7280',
                }}
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
                justifyContent: 'space-between',
                minWidth: '120px',
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    margin: '0',
                    marginBottom: '0.8em',
                    fontWeight: 'bold',
                    fontSize: '1.4em',
                  }}
                >
                  Dane pokoju
                </Typography>
                {roomDetailsData.map((roomData) => (
                  <Box
                    key={roomData.label}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ margin: '0', fontWeight: 'bold' }}
                    >
                      {roomData.label}
                    </Typography>
                    {roomData.label === 'Kolor pokoju:' ? (
                      <Box
                        sx={{
                          backgroundColor: selectedRoom.roomColor,
                          width: '20px',
                          height: '20px',
                          borderRadius: '15px',
                        }}
                      ></Box>
                    ) : (
                      <Typography
                        style={{
                          color:
                            roomData.label === 'Nazwa pokoju:'
                              ? '#0284c7'
                              : '#4b5563',
                          fontWeight:
                            roomData.label === 'Nazwa pokoju:' ? 'bolder' : '',
                        }}
                        variant="body1"
                      >
                        {roomData.value}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '1em',
                }}
              >
                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#0ea5e9',
                    border: '1px solid #d1d5db',
                    borderRadius: '5px',
                    padding: '0.5em',
                  }}
                >
                  <EditIcon style={{ fontSize: '1.5em', margin: '0' }} />
                  <p style={{ fontSize: '.8em', margin: '0' }}>Edytuj</p>
                </Button>

                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#ef4444',
                    border: '1px solid #d1d5db',
                    borderRadius: '5px',
                    padding: '0.5em',
                  }}
                >
                  <DeleteForeverIcon
                    style={{ fontSize: '1.5em', margin: '0' }}
                  />
                  <p style={{ fontSize: '.8em', margin: '0' }}>Usuń</p>
                </Button>
              </Box>
            </Box>
          ) : (
            <p style={{ padding: ' 0 .3em' }}>Wybierz pokój</p>
          )}
          {isOpen && <AddRoom />}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageRoomsModal;
