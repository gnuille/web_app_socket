var query = require('../database/query.js')

module.exports = {
  //Add user with nickname nameUser
  addPlayer: function(nameUser, socket){
    return new Promise(function (fulfill, reject){
      query.existsUser(nameUser).done(function(res){
        try{
          let valid = res[0].numero == 0;
          if(valid){
            query.newUser(nameUser);
          }
          socket.emit("resp_login", valid, nameUser)
        }catch (ex){
          return(ex)
        }
      }, reject)
    })
  },
  sendRooms: function(tableName, socket){
    return new Promise(function (fulfill, reject){
      query.getTables(tableName).done(function(res){
        try{
          socket.emit("tables",res)
        }catch (ex){
          return(ex)
        }
      }, reject)
    })
  },
  createRoom: function(roomname, socket){
    return new Promise(function(fulfill, reject){
      query.existsTable(roomname).done(function(res){
        try{
          let valid = res[0].numero == 0;
          if(valid){
            query.newRoom(roomname);
          }
          socket.emit("resp_create", valid, roomname)
        }catch(ex){
          return(ex)
        }
      }, reject)
    })
  },

  enterRoom: function(nick, tablename, socket){
    query.associatePlayerWithTable(nick, tablename);
    socket.emit("redirectLobby")
  },

  joinedRoom: function(nick, socket, io){
    return new Promise(function(fulfill, reject){
      query.getRoomNameByNick(nick).done(function(res){
        try{
          let room = res[0].roomname
          socket.join(room)
          io.in(room).emit("update_room_players", room)
        }catch(ex){
          reject(ex)
        }
      }, reject)
    })
  },
  getRoomPlayers: function(room, socket, io){
    return new Promise(function(fulfill, reject){
      query.getRoomPlayers(room).done(function(res){
        try{
          io.in(room).emit("data_ready", res)
        }catch(ex){
          return(ex)
        }
      }, reject)
    })
  }
}
