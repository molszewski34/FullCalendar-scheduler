import React from 'react';
import { useForm } from 'react-hook-form';

const PhoneInput = ({ phone, setPhone }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="modal-edit_input">
      <label htmlFor="">Telefon:</label>
      <input
        placeholder="np. 500123456"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {errors.phone && errors.phone.type === 'required' && (
        <p className="error">Pole jest wymagane</p>
      )}
      {errors.phone && errors.phone.type === 'pattern' && (
        <p className="error">Pole może zawierać tylko cyfry</p>
      )}
      {errors.phone && errors.phone.type === 'minLength' && (
        <p className="error">Numer telefonu jest za krótki</p>
      )}
      {errors.phone && errors.phone.type === 'maxLength' && (
        <p className="error">Numer telefonu jest za długi</p>
      )}
    </div>
  );
};

export default PhoneInput;
