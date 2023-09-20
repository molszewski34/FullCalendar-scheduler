import React from 'react';
import DateTime from 'react-datetime';

const ArrivalDateTimeInput = ({ start, setStart }) => {
  return (
    <div className="">
      <label htmlFor="">Przyjazd</label>
      <DateTime value={start} onChange={(date) => setStart(date)} />
    </div>
  );
};

const DepartureDateTimeInput = ({ end, setEnd }) => {
  return (
    <div className="">
      <label htmlFor="">Wyjazd</label>
      <DateTime value={end} onChange={(date) => setEnd(date)} />
    </div>
  );
};

export { ArrivalDateTimeInput, DepartureDateTimeInput };
