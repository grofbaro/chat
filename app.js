const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(__dirname));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 3000;
let server = app.listen(port);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('New User connected');
    io.sockets.emit('connected_user', { uniqueId: randomString(10) });


    socket.on('new_message', (data) => {
        console.log(data);
        io.sockets.emit('new_message', { text: data.message, from: data.from });
    });
});

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}