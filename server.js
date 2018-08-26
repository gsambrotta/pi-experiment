var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('orientationEvent', function(direction) {
    console.log('direction is now:', direction)
  })

  // example
  socket.on('mouseenter', function(event) {
    console.log('mouseenter event', event)
    io.emit('return event', event)
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(5000, function(){
  console.log('server running on port http://localhost:5000');
});
