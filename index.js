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
  return new Promise(function (fulfill, reject){
    query.existsUser(user).done(function (res){
      try {
        console.log('test ' + res[0].numero)

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

function searchTables(key){
  return new Promise(function (fulfill, reject){
    query.getTables(key).done(function (res){
      try {
        console.log(res)
        registeredSockets[0].emit("table_ready", res);
      } catch (ex) {
        reject(ex);
      }
    }, reject);
    });

}

function createRoom(nomRoom){
  return new Promise(function (fulfill, reject){
    query.existsTable(nomRoom).done(function (res){
      try {
        console.log('test ' + res[0].numero)

        if(res[0].numero == 0){
          query.createNewGameTable(nomRoom);
        }
        registeredSockets[0].emit("room created", res[0].numero);
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}
function write_all_tables() {
  return new Promise(function (fulfill, reject){
    query.getAllTables().done(function (res){
      try {
        console.log(res)
        registeredSockets[0].emit("table_ready", res);
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
socket.on('all_tables',write_all_tables)
socket.on("new player", checkinsert)
socket.on("search tables", searchTables)
socket.on("new room", createRoom)
//socket.on("recived nickname",searchLobby)
});

http.listen(3000, function(){
  console.log('listening on *:3000')
});
