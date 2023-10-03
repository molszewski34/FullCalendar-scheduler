import React from 'react';
import moment from 'moment';

const DeleteConfirmationModal = ({
  deleteConfirmationOpen,
  setDeleteConfirmationOpen,
  editedEvent,
  setEditedEvent,
  setOverlay,
  handleEventDelete,
}) => {
  return (
    <>
      {deleteConfirmationOpen && (
        <div className="delete-confirmation">
          <div>
            <p>
              Czy jesteś pewien że chcesz usunać pobyt
              <b> {editedEvent != null && editedEvent._def.title}</b> w dniach:
            </p>
            <p>
              <b>od:</b>
              {`  ${
                editedEvent != null &&
                moment(editedEvent._instance.range.start).format('YYYY-MM-DD')
              }`}
            </p>
            <p>
              <b> do:</b>
              {`     ${
                editedEvent != null &&
                moment(editedEvent._instance.range.end).format('YYYY-MM-DD')
              }`}
            </p>
          </div>
          <div className="delete-confirmation_btn_wrapper">
            <button
              className="delete-confirmation_btn"
              onClick={handleEventDelete}
              style={{ backgroundColor: 'red' }}
            >
              Usuń
            </button>
            <button
              className="delete-confirmation_btn"
              onClick={() => {
                setDeleteConfirmationOpen(false);
                setOverlay(false);
              }}
              style={{ backgroundColor: 'blue' }}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
