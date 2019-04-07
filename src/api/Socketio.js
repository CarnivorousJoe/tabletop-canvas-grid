import openSocket from 'socket.io-client';

let socket;

if (process.env.NODE_ENV === 'development'){
    socket = openSocket('localhost:3030');
} else {
    socket = openSocket();
}

export { socket }