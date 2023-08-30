import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTime from 'react-datetime';
const AddEventModal = ({
  isOpen,
  onClose,
  onEventAdded,
  title,
  setTitle,
  start,
  setStart,
  end,
  setEnd,
  eventClick,
}) => {
  // const [title, setTitle] = useState('');
  // const [start, setStart] = useState(new Date());
  // const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();
    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  console.log(start);
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Imię Nazwisko"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="">
          <label htmlFor="">Przyjazd</label>
          <DateTime value={start} onChange={(date) => setStart(date)} />
        </div>
        <div className="">
          <label htmlFor="">Wyjazd</label>
          <DateTime value={end} onChange={(date) => setEnd(date)} />
        </div>
        <button>Add event</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
