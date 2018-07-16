const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = 4001

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

let counter = 0;

io.on('connection', socket => {
  console.log('User connected')

  socket.on('increaseCounter', (data) => {
    counter++;
    const newData = {
        userId :data.userId,
        counter
    };
    console.log(newData);
    io.sockets.emit('counterHasBeenIncreased', newData)
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))