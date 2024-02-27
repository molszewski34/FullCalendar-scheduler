import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EventContext } from '../../contexts/event.context';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useMutation, useQueryClient } from 'react-query';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditRoom = () => {
  const {
    chossenRoom,
    setChossenRoom,
    roomId,
    setRoomId,
    showColorPicker,
    setShowColorPicker,
    setOpenEditRoomPanel,
    setOpenAddRoomPanel,
    openDeleteRoomPanel,
    setOpenDeleteRoomPanel,
  } = useContext(EventContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });

  useEffect(() => {
    setRoomId(chossenRoom._id);
  }, [chossenRoom._id]);

  const handleColorChange = (color) => {
    setValue('roomColor', color.hex);
  };

  useEffect(() => {
    reset();
  }, [chossenRoom]);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) =>
      axiosInstance
        .patch(`/api/rooms/update-room/${roomId}`, data)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setChossenRoom(data);
        queryClient.invalidateQueries('rooms');
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleUpdate = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        paddingLeft: '1em',
        borderLeft: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <b style={{ margin: '0', marginBottom: '1em' }}>Dane pokoju</b>
      <form style={{ display: 'flex' }} onSubmit={handleSubmit(handleUpdate)}>
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
          {errors.roomName && (
            <p className="error">{errors.roomName.message}</p>
          )}
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

        <Button
          variant="contained"
          size="large"
          type="submit"
          style={{
            marginLeft: '.2em',
            marginTop: '1em',
            backgroundColor: '#0ea5e9',
            display: 'flex',
            alignItems: 'center',
          }}
          endIcon={<EditIcon />}
        >
          Edytuj
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          style={{
            marginLeft: '.2em',
            marginTop: '1em',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            setOpenDeleteRoomPanel(!openDeleteRoomPanel);
            setOpenEditRoomPanel(false);
            setOpenAddRoomPanel(false);
          }}
          endIcon={<DeleteForeverIcon />}
        >
          Usuń
        </Button>
      </form>
    </div>
  );
};

export default EditRoom;
