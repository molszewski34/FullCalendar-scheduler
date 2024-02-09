import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Box } from '@mui/material';
import AddRoom from '../manageRoomsModalComponents/addRoom';
import EditRoom from '../manageRoomsModalComponents/editRoom';
import DeleteRoom from '../manageRoomsModalComponents/deleteRoom';
import CloseIcon from '@mui/icons-material/Close';
import './styles/ManageRoomsModal.css';
import AccordionComponent from '../manageRoomsModalComponents/accordionComponent';
import RoomInfo from '../manageRoomsModalComponents/roomInfo';

const ManageRoomsModal = () => {
  const {
    rooms,
    setRooms,
    setOpenManageRoomsModal,
    openEditRoomPanel,
    setOpenEditRoomPanel,
    openAddRoomPanel,
    setOpenAddRoomPanel,
    openDeleteRoomPanel,
    setOpenDeleteRoomPanel,
  } = useContext(EventContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const { data: roomsData, refetch } = useQuery('rooms', () =>
    axiosInstance.get('/api/rooms/get-rooms').then((response) => response.data)
  );

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
    }
  }, [roomsData]);

  console.log(rooms);

  return (
    <Box className="manage-rooms-modal-container">
      <CloseIcon
        style={{ color: '#dc2626', fontSize: '1.6em', cursor: 'pointer' }}
        onClick={() => setOpenManageRoomsModal(false)}
      />
      <div className="manage-rooms-modal-wrapper">
        <Box className="manage-rooms-modal-header">
          <b>Zarządzaj pokojami</b>
          <Button
            variant="contained"
            className="manage-rooms-modal-add-button"
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
            <AccordionComponent />
          ) : (
            <p style={{ padding: '0.3em', fontSize: '0.9em' }}>Dodaj pokoje</p>
          )}
          {rooms.length != 0 ? <RoomInfo /> : ''}
          {openAddRoomPanel && <AddRoom />}
          {openEditRoomPanel && <EditRoom />}
          {openDeleteRoomPanel && <DeleteRoom />}
        </Box>
      </div>
    </Box>
  );
};

export default ManageRoomsModal;
