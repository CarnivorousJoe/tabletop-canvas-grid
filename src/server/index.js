const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res, next) =>
    res.sendFile(__dirname + './index.html'));

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

server.listen(port);