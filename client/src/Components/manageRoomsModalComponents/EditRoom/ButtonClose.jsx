import { useContext } from 'react';
import { Button } from '@mui/material';
import { EventContext } from '../../../contexts/event.context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ButtonClose = () => {
  const {
    setOpenEditRoomPanel,
    setOpenAddRoomPanel,
    openDeleteRoomPanel,
    setOpenDeleteRoomPanel,
  } = useContext(EventContext);
  return (
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
  );
};

export default ButtonClose;
