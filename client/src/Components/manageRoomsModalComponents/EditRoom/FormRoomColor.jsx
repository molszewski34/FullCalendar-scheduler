import { useContext } from 'react';
import { TextField } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';
import { ChromePicker } from 'react-color';
import CloseIcon from '@mui/icons-material/Close';
const FormRoomColor = ({ errors, register, watch, setValue }) => {
  const { chossenRoom, showColorPicker, setShowColorPicker } =
    useContext(EventContext);

  const handleColorChange = (color) => {
    setValue('roomColor', color.hex);
  };

  return (
    <div>
      <label style={{ fontWeight: 'normal' }} htmlFor="roomColor">
        Kolor pokoju:
      </label>
      <div
        style={{
          display: 'flex',
          gap: '0.3em',
          position: 'relative',
        }}
      >
        <TextField
          hiddenLabel
          size="small"
          variant="filled"
          type="text"
          id="roomColor"
          {...register('roomColor', {
            required: 'To pole nie może być puste',
          })}
          placeholder={chossenRoom.roomColor}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '30px',
            border: '1px solid #94a3b8',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.5em',
            backgroundColor: chossenRoom.roomColor,
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          {showColorPicker ? <CloseIcon /> : ''}
        </div>
        {showColorPicker && (
          <div style={{ position: 'absolute', top: '35px', zIndex: '1' }}>
            <ChromePicker
              color={watch('roomColor')}
              onChange={handleColorChange}
            />
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
