import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Box, Text, Typography } from '@mui/material';
import AddRoom from '../manageRoomsModalComponents/addRoom';
import EditRoom from '../manageRoomsModalComponents/editRoom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const ManageRoomsModal = () => {
  const { rooms, setRooms, roomSelection, setRoomSelection } =
    useContext(EventContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const { data: roomsData, refetch } = useQuery('rooms', () =>
    axiosInstance.get('/api/rooms/get-rooms').then((response) => response.data)
  );

  const [openAddRoomPanel, setOpenAddRoomPanel] = useState(false);
  const [openEditRoomPanel, setOpenEditRoomPanel] = useState(false);

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
    }
  }, [roomsData]);

  const handleRoomButtonClick = (room) => {
    setRoomSelection({ ...room });
  };

  const roomDetailsData = roomSelection
    ? [
        { label: 'Nazwa pokoju:', value: roomSelection.roomName },
        { label: 'Liczba miejsc:', value: roomSelection.roomNumOfGuests },
        { label: 'Cena za osobę:', value: roomSelection.RoomPriceOfGuest },
        { label: 'Kolor pokoju:', value: roomSelection.roomColor },
        { label: 'Lokalizacja:', value: roomSelection.roomLocation },
      ]
    : [];

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
      }}
    >
      <div
        style={{
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
            onClick={() => {
              setOpenAddRoomPanel(!openAddRoomPanel);
              setOpenEditRoomPanel(false);
            }}
          >
            {openAddRoomPanel ? 'Zamknij panel' : 'Dodaj pokój +'}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',

              gap: '0.2em',

              alignContent: 'start',
              maxWidth: '400px',
            }}
          >
            {rooms.map((room) => (
              <>
                <Button
                  key={room.id}
                  size="small"
                  onClick={() => handleRoomButtonClick(room)}
                  style={{
                    fontSize: '0.7em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '50px',

                    border:
                      roomSelection === room
                        ? '1px solid #6b7280'
                        : '1px solid #d1d5db',
                    // borderRadius: '3px',
                    color: '#6b7280',
                  }}
                >
                  {room.roomName}
                </Button>
              </>
            ))}
          </div>

          {roomSelection ? (
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
                    fontWeight: 'bolder',
                    fontSize: '1.3em',
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
                      variant="body1"
                      sx={{
                        margin: '0',

                        fontWeight: '800',
                        fontSize: '1em',
                      }}
                    >
                      {roomData.label}
                    </Typography>
                    {roomData.label === 'Kolor pokoju:' ? (
                      <Box
                        sx={{
                          backgroundColor: roomSelection.roomColor,
                          width: '20px',
                          height: '20px',
                          borderRadius: '15px',
                        }}
                      ></Box>
                    ) : (
                      <Typography
                        style={{
                          fontSize: '1.1em',
                          color:
                            roomData.label === 'Nazwa pokoju:'
                              ? '#44403c'
                              : '#71717a',
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
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '.5em',
                }}
              >
                <button
                  style={{
                    display: 'flex',

                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0ea5e9',
                    color: '#fff',
                    fontWeight: 'bold',
                    border: '1px solid #0284c7',
                    borderRadius: '5px',
                    padding: '0.5em',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setOpenEditRoomPanel(!openEditRoomPanel);
                    setOpenAddRoomPanel(false);
                  }}
                >
                  <EditIcon style={{ fontSize: '1.5em', margin: '0' }} />
                  <p
                    style={{
                      fontSize: '.8em',
                      margin: '0',
                    }}
                  >
                    Edytuj
                  </p>
                </button>

                <button
                  style={{
                    display: 'flex',

                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    fontWeight: 'bold',
                    border: '1px solid #dc2626',
                    borderRadius: '5px',
                    padding: '0.5em',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    cursor: 'pointer',
                  }}
                >
                  <DeleteForeverIcon
                    style={{ fontSize: '1.5em', margin: '0' }}
                  />
                  <p style={{ fontSize: '.8em', margin: '0' }}>Usuń</p>
                </button>
              </Box>
            </Box>
          ) : (
            <p style={{ padding: ' 0 .3em' }}>Wybierz pokój</p>
          )}
          {openAddRoomPanel && <AddRoom />}
          {openEditRoomPanel && <EditRoom />}
        </Box>
      </div>
    </Box>
  );
};

export default ManageRoomsModal;
