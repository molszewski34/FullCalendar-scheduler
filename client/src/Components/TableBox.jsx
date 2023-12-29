import React, { useContext } from 'react';
import { EventContext } from '../contexts/event.context';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const TableBox = () => {
  const { setSearchInput, searchedEvents, setSearchedEvents, setShowTable } =
    useContext(EventContext);
  return (
    <div className="modal-edit">
      <TableContainer
        component={Paper}
        className="modal-edit"
        sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
      >
        <Button
          variant="contained"
          sx={{
            display: 'flex',
            alignSelf: 'flex-end',
            fontWeight: 'bold',
          }}
          onClick={() => {
            setSearchedEvents('');
            setShowTable(false);
            setSearchInput('');
          }}
        >
          Zamknij{' '}
        </Button>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'info.main', color: '#fff' }}>
              <TableCell sx={{ color: '#fff' }}>
                <b>Imię Nazwisko</b>
              </TableCell>
              <TableCell sx={{ color: '#fff' }}>
                <b>Telefon</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>Brak wyników</TableCell>
              </TableRow>
            ) : (
              searchedEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.extendedProps.phone}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableBox;
