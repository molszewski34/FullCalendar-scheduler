import { useEffect, useContext } from 'react';
import axios from 'axios';
import { EventContext } from '../../../contexts/event.context';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import EditEquipmentPanel from './EditEquipmentPanel';
import ChossenEquipmentList from './ChossenEquipmentList';
import ButtonSubmit from './ButtonSubmit';
import ButtonClose from './ButtonClose';
import Form from './Form';
import FormRoomColor from './FormRoomColor';
import FormRoomLocaton from './FormRoomLocaton';
const EditRoom = () => {
  const {
    chossenRoom,
    setChossenRoom,
    roomId,
    setRoomId,
    editSelectedEquipment,
  } = useContext(EventContext);

  console.log(editSelectedEquipment);

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

  const handleUpdate = (data) => {
    const formData = {
      ...data,
      equipment: chossenRoom.equipment,
    };
    mutation.mutate(formData);
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
        <Form errors={errors} register={register} />
        <FormRoomColor
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <FormRoomLocaton register={register} errors={errors} />
        <EditEquipmentPanel />
        <ChossenEquipmentList />
        <ButtonSubmit />
        <ButtonClose />
      </form>
    </div>
  );
};

export default EditRoom;
