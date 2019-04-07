import openSocket from 'socket.io-client';
require('dotenv').config();

let port = process.env.REACT_APP_SOCKETIO_PORT;
const addr = 'http://localhost:';
console.log(port+addr);
const socket = openSocket();

export { socket }