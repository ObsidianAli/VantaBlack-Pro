const { app, BrowserWindow, ipcMain } = require('electron')
const { Sequelize } = require('sequelize');

let sequelize;

function connectToDatabase(serverDetails) {
  sequelize = new Sequelize(serverDetails.database, serverDetails.username, serverDetails.password, {
    host: serverDetails.ip,
    dialect: serverDetails.dialect,
    port: serverDetails.port,
  });

  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

ipcMain.on('server-details', (event, serverDetails) => {
  connectToDatabase(serverDetails);
});

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Add this line if you're using Electron 12 or later
    }
  })

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow)