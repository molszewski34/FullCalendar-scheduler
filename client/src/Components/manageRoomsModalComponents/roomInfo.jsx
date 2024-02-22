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
                      fontSize: '1.3em',
                      color:
                        roomData.label === 'Nazwa pokoju:'
                          ? '#ea580c'
                          : '#71717a',
                      fontWeight: 'bold',
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
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setOpenEditRoomPanel(!openEditRoomPanel);
                setOpenDeleteRoomPanel(false);
                setOpenAddRoomPanel(false);
              }}
              startIcon={
                <EditIcon style={{ fontSize: '1.5em', margin: '0' }} />
              }
            >
              <p
                style={{
                  fontSize: '.8em',
                  margin: '0',
                }}
              >
                Edytuj
              </p>
            </Button>

            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={() => {
                setOpenDeleteRoomPanel(!openDeleteRoomPanel);
                setOpenEditRoomPanel(false);
                setOpenAddRoomPanel(false);
              }}
              startIcon={
                <DeleteForeverIcon style={{ fontSize: '1.5em', margin: '0' }} />
              }
            >
              <p style={{ fontSize: '.8em', margin: '0' }}>Usuń</p>
            </Button>
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
