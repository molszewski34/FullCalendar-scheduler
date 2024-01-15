import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Box, Text, Typography } from '@mui/material';
import AddRoom from '../manageRoomsModalComponents/addRoom';
import EditRoom from '../manageRoomsModalComponents/editRoom';
import DeleteRoom from '../manageRoomsModalComponents/deleteRoom';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const ManageRoomsModal = () => {
  const {
    rooms,
    setRooms,
    roomSelection,
    setRoomSelection,
    openManageRoomsModal,
    setOpenManageRoomsModal,
  } = useContext(EventContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const { data: roomsData, refetch } = useQuery('rooms', () =>
    axiosInstance.get('/api/rooms/get-rooms').then((response) => response.data)
  );

  const [openAddRoomPanel, setOpenAddRoomPanel] = useState(false);
  const [openEditRoomPanel, setOpenEditRoomPanel] = useState(false);
  const [openDeleteRoomPanel, setOpenDeleteRoomPanel] = useState(false);

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

  console.log(roomSelection);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
      <CloseIcon
        style={{ color: '#dc2626', fontSize: '1.6em', cursor: 'pointer' }}
        onClick={() => setOpenManageRoomsModal(false)}
      />
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
            gap: '1em',
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
              setOpenDeleteRoomPanel(false);
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
          {rooms.length > 0 ? (
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
                      minHeight: '50px',
                      color: '#000',
                      fontWeight: ` ${
                        roomSelection && roomSelection._id === room._id
                          ? 'bold'
                          : ''
                      }`,
                      // borderColor: room.roomColor,
                      border: `2px solid  ${
                        roomSelection && roomSelection._id === room._id
                          ? '#000'
                          : '#d4d4d8'
                      }`,
                    }}
                  >
                    {room.roomName}
                  </Button>
                </>
              ))}
            </div>
          ) : (
            <p style={{ padding: '0.3em', fontSize: '0.9em' }}>Dodaj pokoje</p>
          )}
          {rooms.length != 0 ? (
            <div className="">
              {roomSelection ? (
                <Box
                  sx={{
                    display: 'flex',
                    gap: '0.2em',
                    flexDirection: 'column',
                    fontSize: '0.8em',
                    marginLeft: '.5em',
                    justifyContent: 'space-between',

                    width: '120px',
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

                            fontWeight: '700',
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
                                  ? '#ea580c'
                                  : '#71717a',
                              fontWeight:
                                roomData.label === 'Nazwa pokoju:'
                                  ? 'bolder'
                                  : '',
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
                        setOpenDeleteRoomPanel(false);
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
                      onClick={() => {
                        setOpenDeleteRoomPanel(!openDeleteRoomPanel);
                        setOpenEditRoomPanel(false);
                        setOpenAddRoomPanel(false);
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
            </div>
          ) : (
            ''
          )}
          {openAddRoomPanel && <AddRoom />}
          {openEditRoomPanel && <EditRoom />}
          {openDeleteRoomPanel && <DeleteRoom />}
        </Box>
      </div>
    </Box>
  );
};

export default ManageRoomsModal;
