import React, { useEffect, useContext } from 'react';
import DateTime from 'react-datetime';
import { EventContext } from '../contexts/event.context';
import './styles/DateTimeInputs.css';
import 'moment/locale/pl';

const DateTimeInputs = ({}) => {
  const {
    editedEvent,
    start,
    setStart,
    end,
    setEnd,
    daysDifference,
    setDaysDifference,
  } = useContext(EventContext);
  useEffect(() => {
    if (start && end) {
      const oneDay = 24 * 60 * 60 * 1000;
      const startTimestamp = start;
      const endTimestamp = end;
      if (startTimestamp === endTimestamp) {
        setDaysDifference(null);
      } else if (startTimestamp <= endTimestamp) {
        const difference = Math.round(
          Math.abs((startTimestamp - endTimestamp) / oneDay)
        );
        setDaysDifference(difference);
      } else {
        setDaysDifference(0);
      }
    } else {
      setDaysDifference(null);
    }
  }, [start, end]);

  return (
    <div className="date-time-inputs">
      <div className="date-time-wrapper">
        <label htmlFor="">Przyjazd</label>
        <DateTime
          value={start}
          placeholder={
            editedEvent && editedEvent._instance.range.start
              ? editedEvent._instance.range.start
              : ''
          }
          onChange={(date) => setStart(date)}
        />
      </div>
      <div className="date-time-wrapper">
        <label htmlFor="">Wyjazd</label>
        <DateTime
          value={end}
          placeholder={
            editedEvent && editedEvent._instance.range.end
              ? editedEvent._instance.range.end
              : ''
          }
          onChange={(date) => setEnd(date)}
        />
      </div>
      {daysDifference == 0 && (
        <p className="error">
          Dzień wyjazdu nie może poprzedzać dnia przyjazdu
        </p>
      )}
    </div>
  );
};

export default DateTimeInputs;
