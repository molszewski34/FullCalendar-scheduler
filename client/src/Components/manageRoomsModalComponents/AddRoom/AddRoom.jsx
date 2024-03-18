import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { EventContext } from '../../../contexts/event.context';
import { useMutation, useQueryClient } from 'react-query';
import AddEquipmentPanel from './AddEquipmentPanel';
import AddSelectedEquipment from './addSelectedEquipment';
import ButtonSubmit from './ButtonSubmit';
import Form from './Form';
import FormRoomLocation from './FormRoomLocation';
import FormRoomColor from './FormRoomColor';
import initialEquipmentList from '../utils/resetEquimpmentList';
const AddRoom = () => {
  const { addSelectedEquipment, setAddSelectedEquipment, setEquipmentList } =
    useContext(EventContext);

  const queryClient = useQueryClient();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [roomColor, setRoomColor] = useState('#cbd5e1');

  const mutation = useMutation(
    async (data) => await axiosInstance.post('/api/rooms/create-room', data),
    {
      onSuccess: () => {
        console.log('Data added successfully');

        reset();
        setRoomColor('#cbd5e1');
        setAddSelectedEquipment('');
        setEquipmentList(initialEquipmentList);
        queryClient.invalidateQueries('rooms');
      },
      onError: (error) => {
        console.error('Error adding data:', error);
      },
    }
  );

  const onSubmit = (data) => {
    const formData = {
      ...data,
      roomColor: roomColor,
      equipment: addSelectedEquipment,
    };
    mutation.mutate(formData);
  };

  return (
    <main
      style={{
        paddingLeft: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <b style={{ margin: '0', marginBottom: '1em' }}>Wypełnij pola</b>
      <form
        style={{ display: 'flex', gap: '1em' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form register={register} errors={errors} />
        <FormRoomColor register={register} errors={errors} />
        <FormRoomLocation register={register} errors={errors} />
        <AddEquipmentPanel />
        <AddSelectedEquipment />
        <ButtonSubmit />
      </form>
    </main>
  );
};

export default AddRoom;
