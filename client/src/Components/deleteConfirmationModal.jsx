import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteConfirmationModal = ({
  deleteConfirmationOpen,

  open,
  setOpen,
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

  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box>
            <div>
              <DialogTitle id="modal-modal-title" variant="h6" component="h2">
                Czy jesteś pewien że chcesz usunać pobyt{' '}
                <b> {editedEvent != null && editedEvent._def.title}</b>
              </DialogTitle>
              <DialogContent>
                w dniach:
                <b>od:</b>
                {`  ${editedEvent != null && formattedStartDate}`}
                <b> do:</b>
                {`     ${editedEvent != null && formattedEndDate}`}
              </DialogContent>
            </div>

            <DialogActions>
              <Button
                variant="contained"
                color="error"
                onClick={handleEventDelete}
              >
                Usuń
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpen(false);
                  setOverlay(false);
                }}
              >
                Anuluj
              </Button>
            </DialogActions>
          </Box>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteConfirmationModal;
