//server
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.use(express.static(__dirname + '/public'))
//sql

var query = require(__dirname + '/server/query.js')


io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('disconect', function(){
    //treure al nick de la BD
    console.log("a user disconected")
  })

  socket.on("new player", query.newConnection)
  socket.on("new player", query.getAllUsers)


});

http.listen(3000, function(){
  console.log('listening on *:3000')
});
