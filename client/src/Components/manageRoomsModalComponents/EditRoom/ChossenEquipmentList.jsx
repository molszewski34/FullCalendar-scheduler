import { useContext } from 'react';
import { EventContext } from '../../../contexts/event.context';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

const ChossenEquipmentList = () => {
  const {
    chossenRoom,
    setChossenRoom,
    editSelectedEquipment,
    setEditSelectedEquipment,
  } = useContext(EventContext);

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
    <div className="">
      {chossenRoom.equipment !== '' ? (
        <div className="modal-equipment_btn-wrapper">
          {chossenRoom.equipment.map((equipment, index) => (
            <button
              type="button"
              key={index}
              size="small"
              variant="contained"
              className="modal-equipment_btn modal-equipment_btn_chossen"
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
      ) : (
        <Typography sx={{ fontWeight: 'medium' }}>Brak wyposażenia</Typography>
      )}
    </div>
  );
};

export default ChossenEquipmentList;
