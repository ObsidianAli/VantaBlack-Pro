import React, { useState } from 'react';
const { ipcRenderer } = window.require('electron');
// ^^^ ipcRenderer is a tool provided by the Electron framework that allows my application to send and recieve messages between the main process and the
// renderer process. The 'Main' process runs in the background and controls the live cycle of the application. It handles things such as creating windows,
// handling system events, and commmunicating with the operating system. Meanwhile the 'renderer' process is responsible for rendering web pages that make
// up the user interface. Each window in the application is run by its own independent renderer process.
//
// the ipcRenderer allows these two types of processes to communicate with each other. For example, a renderer process might send a message to the main
// process asking it to perform a task that requires access to the operating system, such as reading a file or opening a new window. The main process can
// then perform this task and send a message back to the renderer process with the result.
//
// In the context of my application the renderer process is sending the server information filled out in the form to the renderer process which can then do
// something with them such as sending them over the network.



// ServerForm is a functional component, a function that describes part of the application's user interface. 
const ServerForm = () => {
  const [serverDetails, setServerDetails] = useState({});

  const handleServerDetailsSubmit = (event) => {
    event.preventDefault();
    // Store the server details in local storage
    localStorage.setItem('serverDetails', JSON.stringify(serverDetails));
    // Send the server details to the main process
    ipcRenderer.send('server-details', serverDetails);
  };

  // when on of the form changes, update the server details directly. (So if I already wrote username and password, keep them and add email if I changed it)
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