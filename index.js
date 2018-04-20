var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('orientation', function (msg) {
    socket.emit('orientation', msg);
  })
});

server.listen(5000, function(){
  console.log('server running on port http://localhost:5000');
});