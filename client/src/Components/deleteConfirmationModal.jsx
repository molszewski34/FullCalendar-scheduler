import React from 'react';

const DeleteConfirmationModal = ({
  deleteConfirmationOpen,
  setDeleteConfirmationOpen,
  editedEvent,
  setEditedEvent,
  setOverlay,
  handleEventDelete,
}) => {
  const formattedStartDate =
    editedEvent &&
    new Date(editedEvent._instance.range.start).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  const formattedEndDate =
    editedEvent &&
    new Date(editedEvent._instance.range.end).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

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
              {`  ${editedEvent != null && formattedStartDate}`}
            </p>
            <p>
              <b> do:</b>
              {`     ${editedEvent != null && formattedEndDate}`}
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
