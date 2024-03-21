import React from 'react';
import LoginImage from '../assets/LoginImage.png';

const LoginContent = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1em',
      }}
    >
      <img
        style={{
          maxWidth: '500px',
          '@media (max-width:640px)': {
            maxWidth: '300px',
          },
        }}
        src={LoginImage}
        alt="Login image"
      />

      <h1
        style={{
          fontSize: '2.5em',
          '@media (max-width:640px)': {
            fontSize: '1.4em',
          },
        }}
      >
        FullCalendar Scheduler
      </h1>
      <span
        style={{
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        An easy-to-understand calendar with full management system of rooms and
        the events taking place in them.
      </span>
      <b
        style={{
          maxWidth: '400px',
          textAlign: 'center',
          fontSize: '.8em',
        }}
      >
        After testing changes, please clean up after yourself. Remove all the
        rooms you added. Thanks!
      </b>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <span>
          <b>Login:</b> m.olszewski341@gmail.com
        </span>
        <span>
          <b>Password:</b> Nqi6Mu5FN4gNW$2
        </span>
      </div>
    </div>
  );
};

export default LoginContent;
