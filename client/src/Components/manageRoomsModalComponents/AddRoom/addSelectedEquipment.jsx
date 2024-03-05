import { useContext } from 'react';
import { EventContext } from '../../../contexts/event.context';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
const AddSelectedEquipment = () => {
  const { addSelectedEquipment, setAddSelectedEquipment, setEquipmentList } =
    useContext(EventContext);
  const handleRemoveEquipment = (equipment) => {
    const updatedSelectedEquipment = addSelectedEquipment.filter(
      (item) => item !== equipment
    );
    setAddSelectedEquipment(updatedSelectedEquipment);

    setEquipmentList((prevList) => [...prevList, equipment]);
  };

  return (
    <div className="">
      {addSelectedEquipment !== '' ? (
        <div className="modal-equipment_btn-wrapper">
          {addSelectedEquipment.map((equipment, index) => (
            <button
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

export default AddSelectedEquipment;
