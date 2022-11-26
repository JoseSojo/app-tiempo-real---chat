const express = require('express');
const http = require('http');
const path = require('path');

const {Server} = require('socket.io');

const app = express();
const port = process.env.PORT || 3030;
const host = '127.0.0.1';

const server = http.createServer(app);

// SERVER SOCKET
const io = new Server(server);
let nicknames = [];
// WEBSOCKET
io.on('connection', (socket) => {

  socket.on('newUser', (user, cb) => {
    console.log(user);
    if (nicknames.indexOf(user) != -1) {
      cb(false);
    } else {
      cb(true);
      socket.user = user;
      nicknames.push(socket.user);
      io.emit('usernames', nicknames);
    }
  })

  socket.on('chat', (data) => {
    io.emit('chat', { msg: data, user: socket.user});
  });

  socket.on('disconnect', (data) => {
    if(!socket.user) return;

    nicknames.splice(nicknames.indexOf(socket.user), 1);
    io.emit('usernames', nicknames);
    return;
  });

})

// Static
app.use(express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

server.listen(port, host, () => {
  console.log('Server on port', port);
})
