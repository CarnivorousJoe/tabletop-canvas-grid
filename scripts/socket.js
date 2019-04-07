var express = require('express');
var app = express();

server = app.listen(3030, function(){
    console.log(`server is running on port 3030`)
});

var socket = require('socket.io');
io = socket(server);

io.on('connection', (client) => {
    console.log(client.id + ' Connected');

    client.on('host-path-data', (args) => {
        client.broadcast.emit('path-data', args);
    })
});