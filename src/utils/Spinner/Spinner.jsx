import React from 'react';
import './Spinner.scss';

const Spinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`spinner ${size} ${color}`} />
  );
};

export default Spinner;