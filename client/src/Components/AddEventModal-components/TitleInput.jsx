import React from 'react';
import { useForm } from 'react-hook-form';

const TitleInput = ({ title, setTitle }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="">
      <input
        placeholder="Imię Nazwisko"
        {...register('title', {
          required: true,
          minLength: 1,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i,
        })}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && errors.title.type === 'required' && (
        <p className="error">Pole jest wymagane</p>
      )}
      {errors.title && errors.title.type === 'pattern' && (
        <p className="error">Tytuł nie może zawierać liczb</p>
      )}
      {errors.title && errors.title.type === 'minLength' && (
        <p className="error">Tytuł nie może być pusty</p>
      )}
    </div>
  );
};

export default TitleInput;
