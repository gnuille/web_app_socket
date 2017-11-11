//server
var express = require('express')
var Promise   = require('promise');
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.use(express.static(__dirname + '/public'))
//sql

var query = require(__dirname + '/server/query.js')
var registeredSockets = [];

function checkinsert(user){
  var res;
  res = query.existsUser(user);
  console.log("result= "+res);
  if(res == 0){
    query.newConnection(user);
  }
  registeredSockets[0].emit("can enter", res);
}

function checkinsert(user){
  return new Promise(function (fulfill, reject){
    query.existsUser(user).done(function (res){
      try {
        console.log('test ' + res)
        if(res[0].numero == 0){
          query.newConnection(user);
        }
        registeredSockets[0].emit("can enter", res[0].numero);
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
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
