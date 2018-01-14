var Promise   = require('promise');
var c = require(__dirname+'/connectdb.js')

var connection = c.newconection();
connection.connect();
module.exports = {
  //Add user with nickname nameUser
  newUser: function(nameUser){
    connection.query('INSERT INTO players VALUES (?, NULL)', nameUser , function (error, results, fields) {
        if (error) throw error;
      });
  },
  //Add new room
  newRoom: function(nameTable){
    //console.log("New game table created %s", nameTable);
    connection.query('INSERT INTO rooms VALUES (?)', nameTable , function (error, results, fields) {
        if (error) throw error;
      });
  },

  //Get users
  getAllUsers: function(){
    //console.log("Get all users from database");
    return new Promise(function (fulfill, reject){
    connection.query('select * from players' , function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  //Get users
  getAllTables: function(){
    //console.log("Get all tables from database");
    return new Promise(function (fulfill, reject){
    connection.query('select * from rooms' , function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getTables: function(key){
    return new Promise(function (fulfill, reject){
    var quer= 'select * from rooms where roomname LIKE \'\%' + key+'\%\''
    //console.log(quer)
    connection.query(quer, function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  //Add player to table
  associatePlayerWithTable: function(idUser, idTable){
    //console.log("New player-table association %s %s", idTable, idUser);
    connection.query('INSERT INTO roomplayers VALUES (?,?)', [idUser , idTable] , function (error, results, fields) {
        if (error) throw error;
      });
  },
  //Add challenge to a set of challenges
  createChallenge: function(challenge, roomname){
    //console.log("New challenge %s added to %s", challenge, idSet);
    connection.query('INSERT INTO Challenges(challenge, roomname) VALUES (?,?)', challenge , idSet , function (error, results, fields) {
        if (error) throw error;
      });
  },

  existsUser: function(nameUser){
    return new Promise(function (fulfill, reject){
      connection.query('SELECT COUNT(*) AS numero FROM players WHERE nick = ?', nameUser, function(error, results, fields){
        if (error) throw(error);
        else fulfill(results);
      });
    });
 },

  existsTable: function(nameTable){
    //console.log("checking table " + nameTable);
      return new Promise(function (fulfill, reject){
        connection.query('SELECT COUNT(*) AS numero FROM rooms WHERE roomname = ?', nameTable, function(error, results, fields){
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getRoomNameByNick: function(nameUser){
    //console.log("Get table name from user from database");
    return new Promise(function (fulfill, reject){
    connection.query('SELECT roomname FROM roomplayers WHERE nick = ?' , nameUser,  function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getRoomPlayers: function(nameUser){
    //console.log("Get table name from user from database");
    return new Promise(function (fulfill, reject){
    connection.query('SELECT nick FROM roomplayers WHERE roomname = ? ' , nameUser,  function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  }
//
}
