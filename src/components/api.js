import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

function eventsSubscriber(){
    socket.on('draw', (args) => console.log(args) )
    socket.emit('draw');
    return socket;
}

export { eventsSubscriber }