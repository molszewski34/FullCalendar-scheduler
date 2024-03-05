import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';
const EditEquipmentPanel = () => {
  const { setOpenEditRoomEquipmentModal } = useContext(EventContext);
  return (
    <div>
      <Button
        onClick={() => setOpenEditRoomEquipmentModal(true)}
        size="small"
        variant="contained"
        sx={{
          backgroundColor: '#f59e0b',
          '&:hover': {
            backgroundColor: '#d97706',
          },
        }}
      >
        Zmień wyposażenie
      </Button>
    </div>
  );
};

export default EditEquipmentPanel;
