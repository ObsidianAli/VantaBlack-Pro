import React, { useState } from 'react';
const { ipcRenderer } = window.require('electron');

const ServerForm = () => {
  const [serverDetails, setServerDetails] = useState({});

  const handleServerDetailsSubmit = (event) => {
    event.preventDefault();
    // Store the server details in local storage
    localStorage.setItem('serverDetails', JSON.stringify(serverDetails));
    // Send the server details to the main process
    ipcRenderer.send('server-details', serverDetails);
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
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <input type="text" name="database" placeholder="Database Name" onChange={handleInputChange} />
      <select name="dialect" onChange={handleInputChange}>
        <option value="">Select Dialect</option>
        <option value="mysql">MySQL</option>
        <option value="postgres">PostgreSQL</option>
        <option value="sqlite">SQLite</option>
      </select>
      <button type="submit">Add Server</button>
    </form>
  );
}

export default ServerForm;