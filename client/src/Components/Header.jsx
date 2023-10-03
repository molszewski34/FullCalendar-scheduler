import React from 'react';

const Header = ({ setEditModalOpen, setOverlay }) => {
  return (
    <header className="">
      <button
        className="modal-edit-cancel"
        onClick={() => {
          setEditModalOpen(false);
          setOverlay(false);
        }}
      >
        Anuluj
      </button>
      <h2>Edytuj wydarzenie</h2>
    </header>
  );
};

export default Header;
