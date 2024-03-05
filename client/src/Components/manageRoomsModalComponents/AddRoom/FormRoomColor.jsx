import { useContext, useState } from 'react';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChromePicker } from 'react-color';
import { EventContext } from '../../../contexts/event.context';

const FormRoomColor = ({ errors, register }) => {
  const { showColorPicker, setShowColorPicker } = useContext(EventContext);

  const handleColorChange = (color) => {
    setRoomColor(color.hex);
  };
  const [roomColor, setRoomColor] = useState('#cbd5e1');

  return (
    <div className="">
      <label style={{ fontWeight: 'normal' }} htmlFor="roomColor">
        Kolor pokoju:
      </label>
      <div
        style={{
          display: 'flex',
          gap: '0.3em',
          position: 'relative',
          alignItems: 'center',
        }}
      >
        <TextField
          size="small"
          variant="standard"
          type="text"
          id="roomColor"
          value={roomColor}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '30px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.5em',
            backgroundColor: roomColor,
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          {showColorPicker ? <CloseIcon /> : ''}
        </div>
        {showColorPicker && (
          <div style={{ position: 'absolute', top: '35px', zIndex: '1' }}>
            <ChromePicker color={roomColor} onChange={handleColorChange} />
          </div>
        )}
      </div>
      {errors.roomColor && (
        <span className="error">{errors.roomColor.message}</span>
      )}
    </div>
  );
};

export default FormRoomColor;
