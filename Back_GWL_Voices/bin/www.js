#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('back-gwl-voices:server');
const http = require('http');
const cors = require('cors');

//environments extraction
require("dotenv").config();

//DB Connection
require('../config/db.js');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

app.use(cors());

const server = http.createServer(app);


//Socket.io config
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});

//Subcribes to connection event.

io.on('connection', (socket) => {
  const data = {
    username: '[INFO]',
    text: 'User join to chat',
    created_at: Date.now()
  }
  socket.broadcast.emit('messageChat', data);

  //Subcribes to messageChat event.

  socket.on('messageChat', async (data) => {
    data.created_at = Date.now();
    io.emit('messageChat', data);
  });

  //Subcribes to disconection event.

  socket.on('disconnect', () => {
    const data = {
      username: '[INFO]',
      text: 'User part',
      created_at: new Date()
    }
    io.emit('messageChat', data);
  });
});



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
