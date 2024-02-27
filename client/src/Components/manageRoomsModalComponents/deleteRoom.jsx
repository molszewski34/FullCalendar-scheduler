import React, { useState, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { EventContext } from '../../contexts/event.context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';

const DeleteRoom = () => {
  const [message, setMessage] = useState('');
  const { chossenRoom, setChossenRoom } = useContext(EventContext);
  const queryClient = useQueryClient();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const deleteRoomMutation = useMutation(
    (roomId) =>
      axiosInstance.delete(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/rooms/delete-room/${roomId}`
      ),
    {
      onSuccess: (data) => {
        setChossenRoom(data);
        queryClient.invalidateQueries('rooms');
      },
      onError: (error) => {
        setMessage(`Error: ${error.response.data.message}`);
      },
    }
  );

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRoomMutation.mutate(chossenRoom._id);
  };

  return (
    <div
      style={{
        paddingLeft: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '200px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <b style={{ color: '#dc2626' }}>Czy jesteś pewien, że chcesz usunąć:</b>
        <p style={{ margin: '0' }}>{chossenRoom.roomName} </p>
        <b style={{ margin: '0' }}>
          i wszystkie wydarzenia do niego przypisane ?
        </b>
        <b style={{ margin: '0', marginTop: '1em', color: '#dc2626' }}>
          Te działanie jest nieodwracalne.
        </b>
      </div>
      <Button
        variant="contained"
        size="large"
        color="error"
        onClick={handleDelete}
        startIcon={
          <DeleteForeverIcon style={{ fontSize: '1.5em', margin: '0' }} />
        }
      >
        <p style={{ fontSize: '.8em', margin: '0' }}>Usuń Pokój</p>
      </Button>
    </div>
  );
};

export default DeleteRoom;
