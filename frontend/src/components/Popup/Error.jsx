import React from 'react';
import './Error.css';

const Error = ({ message, onClose }) => {
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <span className="error-popup-message">{message}</span>
        <button className="error-popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Error;
