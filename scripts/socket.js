var express = require('express');
var app = express();

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

var socket = require('socket.io');
io = socket(server);

io.on('connection', (client) => {
    console.log(client.id + ' Connected');

    client.on('penDown', (coordinates) => {
        io.emit('ioPenDown', coordinates);
    })

    client.on('drawing', (coordinates) => {
        console.log(coordinates);
        io.emit('drawing', coordinates);
    })

    client.on('penUp', () => {
        io.emit('ioPenUp');
    })

    client.on('setDimensions', (dimensions) => {
        io.emit('ioSetDimensions', dimensions)
    })
});