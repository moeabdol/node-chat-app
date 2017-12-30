const path     = require('path');
const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');

const PORT   = 3000;
const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('createMessage', message => {
    console.log('createMessage', message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, err => {
  if (err) return console.log(err);
  console.log(`Server listening on port ${PORT}`);
});
