var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
var server = require('http').createServer(app);
var io = require('socket.io')(server)
var query = require(__dirname+'/query.js')
var fs = require("fs")
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


//Sockets stuff

//resplogin takes a nickname and checks if it can be inserted in the database, inserts it if possible and tells the client if he can proceed to app
function resplogin(nick, socket){

  return new Promise(function (fulfill, reject){
  query.existsUser(nick).done(function (res){
    try{

      var valid = res[0].numero == 0;

      if(valid){
        query.newConnection(nick);

      }
      socket.emit("resp_login", valid, nick)
    }catch (ex){
      reject(ex)
    }
  }, reject)})
}

function respsearchtable(key, socket){
  return new Promise(function (fulfill, reject){
    query.getTables(key).done(function (res){
      try{
        socket.emit("tables", res)

      }catch (ex){
        reject(ex)
      }
    }, reject)
  })
}

function respcreatetable(name, socket){
  return new Promise(function (fulfill, reject){
    query.existsTable(name).done(function (res){
      try{
        var valid = res[0].numero == 0;

        if(valid){
          query.createNewGameTable(name)

        }
        socket.emit("resp_create", valid, name)
      }catch (ex){
        reject(ex)
      }
    }, reject)
  })
}

function respjoinlobby(nickname, tablename, socket){
  var userId, tableId;

  return new Promise(function (fulfill, reject){
    query.getUserId(nickname,tablename).done(function (res){
      try {
        userId = res[0][0].id;
        tableId = res[1][0].id;

        query.associatePlayerWithTable(userId, tableId);
        socket.emit("redirectLobby");

      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}

io.on("connection", function(socket){
  socket.on("login", function(nick){
    resplogin(nick,socket)
  })
  socket.on("gather_tables", function(key){
    respsearchtable(key,socket)
  })

  socket.on("create_table", function(name){
    respcreatetable(name, socket)
  })
  socket.on("enter", function(nickname, tablename){
    respjoinlobby(nickname, tablename, socket)
  })
})

var port = process.env.PORT || 3000
server.listen(port, function() {
    console.log("App listening on port: "+3000)
});
