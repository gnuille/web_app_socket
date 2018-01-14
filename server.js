var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
var server = require('http').createServer(app);
var io = require('socket.io')(server)
var fs = require("fs")
var socketHandler = require(__dirname+'/sockets/socketHandler.js')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//HTTPS
app.enable('trust proxy')
app.use (function (req, res, next) {
  if (req.secure || process.env.BLUEMIX_REGION === undefined) {
    next();
  } else {
    console.log('redirecting to https');
    res.redirect('https://' + req.headers.host + req.url);
  }
});

//serve static html, all the dinamic content build with sokets
app.use(express.static(__dirname + '/views'));

io.on("connection", function(socket){
  socket.on("login", function(nick){
    socketHandler.addPlayer(nick, socket)
  })

  socket.on("gather_tables", function(tablename){
    socketHandler.sendRooms(tablename, socket)
  })

  socket.on("create_table", function(tablename){
    socketHandler.createRoom(tablename, socket)
  })

  socket.on("enter", function(nick, tablename){
    socketHandler.enterRoom(nick, tablename, socket)
  })

  socket.on("join_room", function(nick){
    socketHandler.joinedRoom(nick, socket, io)
  })

  socket.on("get_room_players", function(room){
    socketHandler.getRoomPlayers(room, socket, io)
  })
})

var port = process.env.PORT || 3000
server.listen(port, function() {
    console.log("App listening on port: "+3000)
});
