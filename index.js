//server
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.use(express.static(__dirname + '/public'))
//sql

var query = require(__dirname + '/server/query.js')
var registeredSockets = [];

function checkinsert(user){
  var correct;
  correct = !query.existsUser(user);
  if(correct){
    query.newConnection(user);
  }
  registeredSockets[0].emit("can enter", correct);
}

io.on('connection', function(socket){
  registeredSockets[0] = socket;
  console.log('a user connected')
  socket.on('disconect', function(){
    //treure al nick de la BD
    console.log("a user disconected")
  })

 socket.on("new player", checkinsert)




});

http.listen(3000, function(){
  console.log('listening on *:3000')
});
