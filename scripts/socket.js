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

    client.on('hideCanvas', (state) => {
        state ? client.broadcast.emit('ioHideCanvas') : client.broadcast.emit('ioShowCanvas');
    })

    client.on('showCanvas', () => {
    })

    client.on('drawing', (coordinates) => {
        io.emit('drawing', coordinates);
    })

    client.on('penUp', () => {
        io.emit('ioPenUp');
    })

    client.on('clear', () => {
        io.emit('clear');
    })

    client.on('setDimensions', (dimensions) => {
        io.emit('ioSetDimensions', dimensions)
    })
});