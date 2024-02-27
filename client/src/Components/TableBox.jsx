import React, { useContext, useState } from 'react';
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
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const TableBox = () => {
  const { setSearchInput, searchedEvents, setSearchedEvents, setShowTable } =
    useContext(EventContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const tableHeaders = [
    { label: 'Nazwa' },
    { label: 'Telefon' },
    { label: 'Od' },
    { label: 'Do' },
    { label: 'Osób' },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className="modal-table">
      <TableContainer
        component={Paper}
        className="modal-table"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <Button
          variant="contained"
          sx={{ display: 'flex', alignSelf: 'flex-end', fontWeight: 'bold' }}
          onClick={() => {
            setSearchedEvents('');
            setShowTable(false);
            setSearchInput('');
          }}
        >
          Zamknij
        </Button>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'info.main', color: '#fff' }}>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: '#fff',
                    fontSize: '0.8em',
                    '@media (max-width:640px)': {
                      fontSize: '0.6em',
                    },
                  }}
                >
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
              (rowsPerPage > 0
                ? searchedEvents.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : searchedEvents
              ).map((event, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    sx={{
                      fontSize: '0.8em',
                      '@media (max-width:640px)': {
                        fontSize: '0.6em',
                      },
                    }}
                  >
                    {event.title}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      fontSize: '0.8em',
                      '@media (max-width:640px)': {
                        fontSize: '0.6em',
                      },
                    }}
                  >
                    {event.extendedProps.phone}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      fontSize: '0.8em',
                      '@media (max-width:640px)': {
                        fontSize: '0.6em',
                      },
                    }}
                  >
                    {formatDate(event.start)}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      fontSize: '0.8em',
                      '@media (max-width:640px)': {
                        fontSize: '0.6em',
                      },
                    }}
                  >
                    {formatDate(event.end)}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      fontSize: '0.8em',
                      '@media (max-width:640px)': {
                        fontSize: '0.6em',
                      },
                    }}
                  >
                    {event.extendedProps.numOfGuests}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchedEvents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Wierszy na stronę:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} z ${count}`
          }
        />
      </TableContainer>
    </div>
  );
};

export default TableBox;
