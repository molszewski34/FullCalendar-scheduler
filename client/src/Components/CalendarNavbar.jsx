import React, { useContext } from 'react';
import { EventContext } from '../contexts/event.context';
import { Button, TextField, Box, InputAdornment } from '@mui/material';
import { UserContext } from '../contexts/user.context';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import { FilterRooms } from './utilities/FilterRooms';

const CalendarNavbar = () => {
  const {
    setSelectedCategory,
    searchInput,
    setSearchInput,
    openManageRoomsModal,
    setOpenManageRoomsModal,
  } = useContext(EventContext);

  // ** Login/LogOut
  const { logOutUser } = useContext(UserContext);

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();

      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          position: 'relative',
        }}
      >
        <Button variant="contained" onClick={logOut}>
          Wyloguj
        </Button>
        <Button
          variant="contained"
          startIcon={<ManageAccountsIcon />}
          onClick={() => setOpenManageRoomsModal(!openManageRoomsModal)}
          color="secondary"
        >
          Zarządzaj pokojami
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          position: 'relative',
        }}
      >
        <Box
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            hiddenLabel
            size="small"
            type="text"
            placeholder="Wyszukaj osobę..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              sx: { pr: '24px' },
              placeholderTypographyProps: { fontSize: '0.6em' },
            }}
          />
        </Box>

        <FilterRooms setSelectedCategory={setSelectedCategory}></FilterRooms>
      </Box>
    </Box>
  );
};

export default CalendarNavbar;
