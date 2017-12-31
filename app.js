const path     = require('path');
const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');

const PORT   = 3000;
const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);

const { generateMessage } = require('./utils/message');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('newMessage',
    generateMessage('Admin', 'Welcome to the chat app.'));

  socket.broadcast.emit('newMessage',
    generateMessage('Admin', 'New user joined.'));

  socket.on('createMessage', message => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, err => {
  if (err) return console.log(err);
  console.log(`Server listening on port ${PORT}`);
});
