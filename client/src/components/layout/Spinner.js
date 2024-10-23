import React from 'react';
import spinner from './spinner.gif';

// Assign the arrow function to a variable
const Spinner = () => (
  <div style={{ width: '200px', margin: 'auto', display: 'block' }}>
    <img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
  </div>
);

// Export the Spinner component
export default Spinner;
