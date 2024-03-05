import { useContext } from 'react';
import { TextField } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';

const Form = ({ register, errors }) => {
  const { chossenRoom } = useContext(EventContext);
  return (
    <>
      <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontWeight: 'normal' }} htmlFor="roomName">
          Nazwa pokoju:
        </label>
        <TextField
          hiddenLabel
          size="small"
          variant="filled"
          type="text"
          id="roomName"
          {...register('roomName', {
            required: 'Nazwa pokoju jest wymagana',
          })}
          placeholder={chossenRoom.roomName}
        />
        {errors.roomName && <p className="error">{errors.roomName.message}</p>}
      </div>
      <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontWeight: 'normal' }} htmlFor="roomNumOfGuests">
          Liczba miejsc:
        </label>
        <TextField
          hiddenLabel
          size="small"
          variant="filled"
          id="roomNumOfGuests"
          {...register('roomNumOfGuests', {
            required: 'Liczba miejsc jest wymagana',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Pole może zawierać tylko liczby',
            },
            min: {
              value: 1,
              message: 'Liczba miejsc nie może być mniejsza niż 1',
            },
            max: {
              value: 9999,
              message: 'Przekroczono maksymalną liczbę osób',
            },
          })}
          placeholder={chossenRoom.roomNumOfGuests}
        />
        {errors.roomNumOfGuests && (
          <p className="error">{errors.roomNumOfGuests.message}</p>
        )}
      </div>
      <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontWeight: 'normal' }} htmlFor="RoomPriceOfGuest">
          Cena za osobę
        </label>
        <TextField
          hiddenLabel
          size="small"
          variant="filled"
          id="RoomPriceOfGuest"
          {...register('RoomPriceOfGuest', {
            required: 'Cena za osobę jest wymagana',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Pole może zawierać tylko liczby',
            },
            min: {
              value: 1,
              message: 'Liczba miejsc nie może być mniejsza niż 1',
            },
            max: {
              value: 9999,
              message: 'Przekroczono maksymalną liczbę osób',
            },
          })}
          placeholder={chossenRoom.RoomPriceOfGuest}
        />
        {errors.RoomPriceOfGuest && (
          <p className="error">{errors.RoomPriceOfGuest.message}</p>
        )}
      </div>
    </>
  );
};

export default Form;
