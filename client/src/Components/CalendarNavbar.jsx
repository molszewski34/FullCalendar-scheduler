import React, { useContext, useState } from 'react';
import { EventContext } from '../contexts/event.context';
import { Button, TextField, Box, InputAdornment } from '@mui/material';
import { UserContext } from '../contexts/user.context';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import { FilterRooms } from './utilities/FilterRooms/FilterRooms';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
const CalendarNavbar = () => {
  const {
    setSelectedCategory,
    searchInput,
    setSearchInput,
    openManageRoomsModal,
    setOpenManageRoomsModal,
    overlay,
    setOverlay,
  } = useContext(EventContext);

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

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {isTablet ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
            position: 'relative',
          }}
        >
          <Button
            sx={{
              backgroundColor: '#fee2e2',
              color: '#334155',
              '&:hover': {
                backgroundColor: '#fecaca',
              },
            }}
            variant="contained"
            onClick={logOut}
            startIcon={<LogoutIcon />}
          >
            Wyloguj
          </Button>
          <Button
            variant="contained"
            startIcon={<ManageAccountsIcon />}
            onClick={() => {
              setOpenManageRoomsModal(true);
              setOverlay(true);
            }}
            sx={{
              backgroundColor: '#f1f5f9',
              color: '#000',
              '&:hover': {
                backgroundColor: '#e2e8f0',
              },
            }}
          >
            Zarządzaj pokojami
          </Button>
        </Box>
      ) : (
        <div>
          <Button
            variant="contained"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            startIcon={<MenuIcon />}
            sx={{
              backgroundColor: '#64748b',
              '&:hover': {
                backgroundColor: '#475569',
              },
            }}
          >
            Menu
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setOpenManageRoomsModal(!openManageRoomsModal);
                handleClose();
              }}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              Zarządzaj pokojami
            </MenuItem>
            <MenuItem
              onClick={() => {
                logOut();
                handleClick();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Wyloguj
            </MenuItem>
          </Menu>
        </div>
      )}
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
            placeholder="Szukaj..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              sx: { pr: '24px', ml: '1em' },
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
