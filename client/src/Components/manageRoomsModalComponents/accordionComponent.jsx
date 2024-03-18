import React, { useContext, useEffect, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EventContext } from '../../contexts/event.context';
import { Typography } from '@mui/material';
import initialEquipmentList from './utils/resetEquimpmentList';

const AccordionComponent = () => {
  const {
    rooms,
    setChossenRoom,
    setOpenEditRoomPanel,
    setOpenDeleteRoomPanel,
    setOpenAddRoomPanel,
    equipmentList,
    setEquipmentList,
  } = useContext(EventContext);

  const sortedRooms = rooms.sort(
    (a, b) => a.roomNumOfGuests - b.roomNumOfGuests
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '500px',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        overflowScrolling: 'touch',
        overscrollBehaviorY: 'none',
        paddingRight: '.5em',
        width: '180px',
      }}
    >
      {[...new Set(sortedRooms.map((room) => room.roomNumOfGuests))].map(
        (uniqueRoomNumOfGuests, index) => {
          let word = 'łóżek';
          if (uniqueRoomNumOfGuests === 1) {
            word = 'łóżko';
          } else if (
            uniqueRoomNumOfGuests % 10 >= 2 &&
            uniqueRoomNumOfGuests % 10 <= 4 &&
            (uniqueRoomNumOfGuests % 100 < 10 ||
              uniqueRoomNumOfGuests % 100 >= 20)
          ) {
            word = 'łóżka';
          }

          const handleRoomButtonClick = (room) => {
            setChossenRoom({ ...room });
            setOpenEditRoomPanel(true);
            setOpenAddRoomPanel(false);
            setOpenDeleteRoomPanel(false);
            setEquipmentList(initialEquipmentList);
          };

          const defaultExpanded =
            uniqueRoomNumOfGuests === 2 || uniqueRoomNumOfGuests === 3;

          return (
            <Accordion key={index} defaultExpanded={defaultExpanded}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                sx={{
                  boxShadow: 1,
                  backgroundColor: '#f1f5f9',
                }}
              >
                <p style={{ fontSize: '1em', margin: '0em' }}>
                  {uniqueRoomNumOfGuests} {word}
                </p>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '0' }}>
                <Typography>
                  {sortedRooms
                    .filter(
                      (filteredRoom) =>
                        filteredRoom.roomNumOfGuests === uniqueRoomNumOfGuests
                    )
                    .map((filteredRoom, i) => (
                      <Typography
                        key={i}
                        sx={{
                          boxShadow: 1,
                          paddingY: '1em',
                          paddingX: '.5em',
                          cursor: 'pointer',
                          fontSize: '.8em',
                        }}
                        onClick={() => handleRoomButtonClick(filteredRoom)}
                      >
                        {filteredRoom.roomName}
                      </Typography>
                    ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        }
      )}
    </div>
  );
};

export default AccordionComponent;
