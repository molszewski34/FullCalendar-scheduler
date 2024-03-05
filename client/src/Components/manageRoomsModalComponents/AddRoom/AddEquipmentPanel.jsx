import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';
const AddEquipmentPanel = () => {
  const { setOpenAddRoomEquipmentModal } = useContext(EventContext);
  return (
    <div>
      <Button
        onClick={() => setOpenAddRoomEquipmentModal(true)}
        size="small"
        variant="contained"
        sx={{
          backgroundColor: '#f59e0b',
          '&:hover': {
            backgroundColor: '#d97706',
          },
        }}
      >
        Wyposażenie +
      </Button>
    </div>
  );
};

export default AddEquipmentPanel;
