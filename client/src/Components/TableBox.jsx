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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const tableHeaders = [
    { label: 'Imię Nazwisko' },
    { label: 'Telefon' },
    { label: 'Od' },
    { label: 'Do' },
    { label: 'Osób' },
  ];
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
              {tableHeaders.map((header) => (
                <TableCell sx={{ color: '#fff', fontSize: '0.8em' }}>
                  <b>{header.label}</b>
                </TableCell>
              ))}
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
                  <TableCell sx={{ fontSize: '0.8em' }}>
                    {event.title}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8em' }}>
                    {event.extendedProps.phone}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8em' }}>
                    {formatDate(event.start)}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8em' }}>
                    {formatDate(event.end)}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8em' }}>
                    {event.extendedProps.numOfGuests}
                  </TableCell>
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
