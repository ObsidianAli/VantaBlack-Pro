const { app, BrowserWindow, ipcMain } = require('electron')
const { Sequelize } = require('sequelize');

let sequelize;
let User;
// Variable for storing registration data until the connection to the database has been established.
let pendingRegistrationData = null;

function connectToDatabase(serverDetails) {
  sequelize = new Sequelize(serverDetails.database, serverDetails.username, serverDetails.password, {
    host: serverDetails.ip,
    dialect: serverDetails.dialect,
    port: serverDetails.port,
  });

  // Define the model, User, that will be inserted into the database. The table name will be 'VantaBlack-Users'
  User = sequelize.define('VantaBlack-Users', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  // Create a new table called VantaBlack-Users (if it doesn't already exist and THEN -> insert the userdata)
  sequelize.sync()
    .then(() => {
      console.log('Database & tables created!');
      return sequelize.authenticate();
    })
    .then(() => {
      console.log('Connection has been established successfully.');
      // If there is pending registration data, save it to the database
      if (pendingRegistrationData) {
        return User.create(pendingRegistrationData);
      }
    })
    .then(() => {
      if (pendingRegistrationData) {
        console.log('User registered successfully.');
        pendingRegistrationData = null;
      }
    })
    .catch(err => {
      console.error('Unable to create database:', err);
    });
}

ipcMain.on('register-user', (event, userData) => {
  // If the connection is not ready, store the registration data for later
  if (!sequelize) {
    pendingRegistrationData = userData;
  } else {
    // If the connection is ready, save the registration data to the database. (This code could probablty)
    User.create(userData)
      .then(() => {
        console.log('User registered successfully.');
      })
      .catch(err => {
        console.error('Unable to register user:', err);
      });
  }
});

ipcMain.on('server-details', (event, serverDetails) => {
  connectToDatabase(serverDetails);
});

// Create application window
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Add this line if you're using Electron 12 or later
    },
  })

  win.loadURL('http://localhost:3000')
  win.maximize(); // This stars the application in windowed fullscreen
}

app.whenReady().then(createWindow)