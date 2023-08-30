import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTime from 'react-datetime';
const EditEventModal = ({
  isOpen,
  onClose,
  editedEvent,
  onSave,
  title,
  setTitle,
  start,
  setStart,
  end,
  setEnd,
}) => {
  const [editedTitle, setEditedTitle] = useState(
    editedEvent ? editedEvent.title : ''
  );

  const handleSave = ({ isOpen, onClose }) => {
    onSave({ ...editedEvent, title: editedTitle });
    onClose();
  };

  const onSubmit = (event) => {};

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="">
          <label htmlFor="">Start Date</label>
          <DateTime value={start} onChange={(date) => setStart(date)} />
        </div>
        <div className="">
          <label htmlFor="">End Date</label>
          <DateTime value={end} onChange={(date) => setEnd(date)} />
        </div>
        <button>Add event</button>
      </form>
    </Modal>

    // <div className={`edit-event-modal ${isOpen ? 'open' : ''}`}>
    //   <div className="edit-event-modal-content">
    //     <h2>Edytuj wydarzenie</h2>
    //     <input
    //       type="text"
    //       value={editedTitle}
    //       onChange={(e) => setEditedTitle(e.target.value)}
    //     />
    //     <button onClick={handleSave}>Zapisz</button>
    //     <button onClick={onClose}>Anuluj</button>
    //   </div>
    // </div>
  );
};

export default EditEventModal;
