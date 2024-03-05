import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';
import initialEquipmentList from '../utils/resetEquimpmentList';
import CloseIcon from '@mui/icons-material/Close';

const ManageEditRoomsEquipmentModal = () => {
  const {
    setOpenEditRoomEquipmentModal,
    chossenRoom,
    setChossenRoom,
    equipmentList,
    setEquipmentList,
    editSelectedEquipment,
    setEditSelectedEquipment,
  } = useContext(EventContext);

  const handleAddEquipment = (equipment) => {
    if (!chossenRoom.equipment.find((item) => item.name === equipment.name)) {
      const updatedEquipmentList = equipmentList.filter(
        (item) => item !== equipment
      );
      setEquipmentList(updatedEquipmentList);
      const updatedChossenRoom = {
        ...chossenRoom,
        equipment: [...chossenRoom.equipment, equipment],
      };

      setChossenRoom(updatedChossenRoom);
      setEditSelectedEquipment([...editSelectedEquipment, equipment]);
    }
  };

  const handleRemoveEquipment = (equipment) => {
    const updatedSelectedEquipment = editSelectedEquipment.filter(
      (item) => item !== equipment
    );

    const updatedChossenRoom = {
      ...chossenRoom,
      equipment: chossenRoom.equipment.filter((item) => item !== equipment),
    };

    setChossenRoom(updatedChossenRoom);
    setEditSelectedEquipment(updatedSelectedEquipment);
  };

  return (
    <div className="modal-equipment">
      <div className="">
        <h3>Dodaj wyposażenie</h3>
        <div className="modal-equipment_btn-wrapper">
          {equipmentList.map(
            (equipment, index) =>
              !chossenRoom.equipment.find(
                (item) => item.name === equipment.name
              ) && (
                <button
                  className="modal-equipment_btn modal-equipment_btn_add"
                  key={index}
                  size="small"
                  variant="contained"
                  color="info"
                  onClick={() => {
                    handleAddEquipment(equipment);
                    setEquipmentList(initialEquipmentList);
                  }}
                >
                  <span style={{ fontFamily: 'Material Icons' }}>
                    {equipment.icon}
                  </span>
                  {equipment.name} +
                </button>
              )
          )}
        </div>
      </div>
      <div className="">
        <h3>Wybrane</h3>
        <div className="modal-equipment_btn-wrapper">
          {chossenRoom.equipment.map((equipment, index) => (
            <button
              className="modal-equipment_btn modal-equipment_btn_selected"
              key={index}
              onClick={() => handleRemoveEquipment(equipment)}
            >
              <span style={{ fontFamily: 'Material Icons' }}>
                {equipment.icon}
              </span>
              {equipment.name}
              <div className="modal-equipment_btn__remove">
                <CloseIcon sx={{ fontSize: '15px' }} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <Button
        sx={{ alignSelf: 'center' }}
        size="large"
        variant="contained"
        color="success"
        onClick={() => setOpenEditRoomEquipmentModal(false)}
      >
        Zamknij
      </Button>
    </div>
  );
};

export default ManageEditRoomsEquipmentModal;
