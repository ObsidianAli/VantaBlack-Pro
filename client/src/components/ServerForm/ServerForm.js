import React, { useState } from 'react';

const ServerForm = () => {
  const [serverDetails, setServerDetails] = useState({});

  const handleServerDetailsSubmit = (event) => {
    event.preventDefault();
    // Store the server details in local storage
    localStorage.setItem('serverDetails', JSON.stringify(serverDetails));
  };

  const handleInputChange = (event) => {
    setServerDetails({
      ...serverDetails,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form onSubmit={handleServerDetailsSubmit}>
      <input type="text" name="ip" placeholder="Server IP" onChange={handleInputChange} />
      <input type="text" name="port" placeholder="Server Port" onChange={handleInputChange} />
      <button type="submit">Add Server</button>
    </form>
  );
};

export default ServerForm;