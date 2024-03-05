import { useContext } from 'react';
import { TextField, Box } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';
const FormRoomLocaton = ({ errors, register }) => {
  const { chossenRoom } = useContext(EventContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontWeight: 'normal' }} htmlFor="roomLocation">
        Lokalizacja:
      </label>
      <TextField
        hiddenLabel
        size="small"
        variant="filled"
        type="text"
        id="roomLocation"
        {...register('roomLocation', {
          required: 'Lokalizacja jest wymagana',
          minLength: {
            value: 3,
            message: 'Nazwa musi mieć co najmniej 3 znaki',
          },
          maxLength: {
            value: 30,
            message: 'Nazwa nie może mieć więcej niż 20 znaków',
          },
        })}
        placeholder={chossenRoom.roomLocation}
      />
      {errors.roomLocation && (
        <p className="error">{errors.roomLocation.message}</p>
      )}
    </Box>
  );
};

export default FormRoomLocaton;
