//server
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

//sql

var query = require(__dirname + '/server/query.js')

app.get('/', function(req, res){
  res.sendFile(__dirname + "/public/index.html")
});

io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('disconect', function(){
    //treure al nick de la BD
    console.log("a user disconected")
  })

  socket.on("new player", query.newConnection)
  socket.on("new player", query.getAllUsers)
  socket.on("new player", query.deleteConnection)


});

http.listen(3000, function(){
  console.log('listening on *:3000')
});
