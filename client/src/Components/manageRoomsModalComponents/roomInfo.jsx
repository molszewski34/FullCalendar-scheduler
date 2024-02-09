import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import { Button, Box, Text, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const RoomInfo = () => {
  const {
    chossenRoom,
    openEditRoomPanel,
    setOpenEditRoomPanel,
    openAddRoomPanel,
    setOpenAddRoomPanel,
    openDeleteRoomPanel,
    setOpenDeleteRoomPanel,
  } = useContext(EventContext);

  const roomDetailsData = chossenRoom
    ? [
        { label: 'Nazwa pokoju:', value: chossenRoom.roomName },
        { label: 'Liczba miejsc:', value: chossenRoom.roomNumOfGuests },
        { label: 'Cena za osobę:', value: chossenRoom.RoomPriceOfGuest },
        { label: 'Kolor pokoju:', value: chossenRoom.roomColor },
        { label: 'Lokalizacja:', value: chossenRoom.roomLocation },
      ]
    : [];
  return (
    <div className="">
      {chossenRoom ? (
        <Box
          sx={{
            display: 'flex',
            gap: '0.2em',
            flexDirection: 'column',
            fontSize: '0.8em',
            marginX: '1em',
            justifyContent: 'space-between',
            width: '120px',
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
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
                      backgroundColor: chossenRoom.roomColor,
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
              className="room-action-button"
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
              <DeleteForeverIcon style={{ fontSize: '1.5em', margin: '0' }} />
              <p style={{ fontSize: '.8em', margin: '0' }}>Usuń</p>
            </button>
          </Box>
        </Box>
      ) : (
        <p
          style={{
            padding: ' 0 .3em',
            width: '100%',
            margin: '0 .7em',
            color: '#334155',
            fontWeight: 'bold',
          }}
        >
          Wybierz pokój
        </p>
      )}
    </div>
  );
};

export default RoomInfo;
