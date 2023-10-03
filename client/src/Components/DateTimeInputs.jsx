import React, { useEffect } from 'react';
import DateTime from 'react-datetime';

const DateTimeInputs = ({
  start,
  setStart,
  end,
  setEnd,
  editedEvent,
  setDaysDifference,
}) => {
  useEffect(() => {
    if (start && end) {
      const oneDay = 24 * 60 * 60 * 1000;

      const startTimestamp = start;
      const endTimestamp = end;

      const difference = Math.round(
        Math.abs((startTimestamp - endTimestamp) / oneDay)
      );
      setDaysDifference(difference);
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
          placeholde={
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
    </div>
  );
};

export default DateTimeInputs;
