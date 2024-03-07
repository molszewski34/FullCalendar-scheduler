import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/index.css';

const ManageAddRoomsEquipmentModal = () => {
  const {
    setOpenAddRoomEquipmentModal,
    addSelectedEquipment,
    setAddSelectedEquipment,
    equipmentList,
    setEquipmentList,
  } = useContext(EventContext);

  const handleAddEquipment = (equipment, index) => {
    const updatedEquipmentList = equipmentList.filter(
      (item) => item !== equipment
    );

    setEquipmentList(updatedEquipmentList);

    setAddSelectedEquipment((prevEquipment) => [...prevEquipment, equipment]);
  };

  const handleRemoveEquipment = (equipment) => {
    const updatedSelectedEquipment = addSelectedEquipment.filter(
      (item) => item !== equipment
    );
    setAddSelectedEquipment(updatedSelectedEquipment);

    setEquipmentList((prevList) => [...prevList, equipment]);
  };

  return (
    <div className="modal-equipment">
      <div className="">
        <h3>Dodaj wyposażenie</h3>
        <div className="modal-equipment_btn-wrapper">
          {equipmentList.map((equipment, index) => (
            <button
              className="modal-equipment_btn modal-equipment_btn_add"
              key={index}
              size="small"
              variant="contained"
              color="info"
              onClick={() => handleAddEquipment(equipment, index)}
            >
              <span style={{ fontFamily: 'Material Icons' }}>
                {equipment.icon}
              </span>
              {equipment.name} +
            </button>
          ))}
        </div>
      </div>
      <div className="">
        <h3>Wybrane</h3>
        <div className="modal-equipment_btn-wrapper">
          {addSelectedEquipment.map((equipment, index) => (
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
        onClick={() => setOpenAddRoomEquipmentModal(false)}
      >
        Zamknij
      </Button>
    </div>
  );
};

export default ManageAddRoomsEquipmentModal;
