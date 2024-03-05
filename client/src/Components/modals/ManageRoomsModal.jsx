import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Box } from '@mui/material';
import AddRoom from '../manageRoomsModalComponents/AddRoom/AddRoom';
import EditRoom from '../manageRoomsModalComponents/EditRoom/EditRoom';
import DeleteRoom from '../manageRoomsModalComponents/deleteRoom';
import CloseIcon from '@mui/icons-material/Close';
import './styles/ManageRoomsModal.css';
import AccordionComponent from '../manageRoomsModalComponents/accordionComponent';
import ManageAddRoomsEquipmentModal from '../manageRoomsModalComponents/AddRoom/ManageAddRoomsEquipmentModal';
import ManageEditRoomsEquipmentModal from '../manageRoomsModalComponents/EditRoom/ManageEditRoomsEquipmentModal';
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
    openAddRoomEquipmentModal,
    openEditRoomEquipmentModal,
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

  return (
    <Box className="manage-rooms-modal-container">
      <CloseIcon
        style={{
          color: '#dc2626',
          fontSize: '1.6em',
          cursor: 'pointer',
          border: '2px solid #dc2626',
        }}
        onClick={() => {
          setOpenManageRoomsModal(false);
          setOpenDeleteRoomPanel(false);
        }}
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
            sx={{
              fontSize: '0.8em',
              '@media (max-width:640px)': {
                fontSize: '.6em',
              },
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
          {openAddRoomPanel && <AddRoom />}
          {openEditRoomPanel && <EditRoom />}
          {openDeleteRoomPanel && <DeleteRoom />}
          {openAddRoomEquipmentModal && <ManageAddRoomsEquipmentModal />}
          {openEditRoomEquipmentModal && <ManageEditRoomsEquipmentModal />}
        </Box>
      </div>
    </Box>
  );
};

export default ManageRoomsModal;
