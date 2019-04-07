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

    client.on('host-path-data', (args) => {
        client.broadcast.emit('path-data', args);
    })

    client.on('set-canvas-dimensions', (args) => {
        client.broadcast.emit('resize-canvas', args);
    })

    client.on('set-grid-spacing', (spacing) => {
        client.broadcast.emit('set-spacing', spacing);
    })

    client.on('maybe-hide-canvas', (isHidden) => {
        client.broadcast.emit('hide-canvas', isHidden);
    })
});

server.listen(port);