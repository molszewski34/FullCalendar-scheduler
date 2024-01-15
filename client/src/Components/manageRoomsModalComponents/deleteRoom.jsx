import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { EventContext } from '../../contexts/event.context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DeleteRoom = () => {
  const [message, setMessage] = useState('');
  const { roomSelection, roomId, setRoomId, setRoomSelection } =
    useContext(EventContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });

  useEffect(() => {
    setRoomId(roomSelection._id);
  }, [roomSelection._id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.delete(
        `/api/rooms/delete-room/${roomId}`
      );

      setRoomSelection(response.data);
    } catch (error) {
      setMessage(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div
      style={{
        marginLeft: '2em',
        paddingLeft: '1em',
        borderLeft: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '200px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <b style={{ color: '#dc2626' }}>Czy jesteś pewien, że chcesz usunąć:</b>
        <p style={{ margin: '0' }}>{roomSelection.roomName} </p>
        <b style={{ margin: '0' }}>
          i wszystkie wydarzenia do niego przypisane ?
        </b>
        <b style={{ margin: '0', marginTop: '1em', color: '#dc2626' }}>
          Te działanie jest nieodwracalne. Bądź pewien, że wiesz co robisz.
        </b>
      </div>
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
        onClick={handleDelete}
      >
        <DeleteForeverIcon style={{ fontSize: '1.5em', margin: '0' }} />
        <p style={{ fontSize: '.8em', margin: '0' }}>Usuń Pokój</p>
      </button>
    </div>
  );
};

export default DeleteRoom;
