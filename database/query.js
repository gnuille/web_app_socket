var Promise   = require('promise');
var c = require(__dirname+'/connectdb.js')

var connection = c.newconection();
connection.connect();
module.exports = {
  //Add user
  newConnection: function(nameUser){
    //console.log("new user conected %s", nameUser);
    connection.query('INSERT INTO users(name) VALUES (?)', nameUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User created ', nameUser);
      });
  },
  //Delete user
  deleteConnection: function(nameUser){
    //console.log("new user conected %s", nameUser);
    connection.query('DELETE FROM users WHERE name = ?', nameUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', nameUser);
      });
  },
  //Add new table
  createNewGameTable: function(nameTable){
    //console.log("New game table created %s", nameTable);
    connection.query('INSERT INTO tables(name) VALUES (?)', nameTable , function (error, results, fields) {
        if (error) throw error;
        console.log('New game table created ', nameTable);
      });
  },

  //Get users
  getAllUsers: function(){
    //console.log("Get all users from database");
    return new Promise(function (fulfill, reject){
    connection.query('select * from users' , function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  //Get users
  getAllTables: function(){
    //console.log("Get all tables from database");
    return new Promise(function (fulfill, reject){
    connection.query('select * from tables' , function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getTables: function(key){
    //console.log("Searching a table");
    return new Promise(function (fulfill, reject){
    var quer= 'select * from tables where name LIKE \'\%' + key+'\%\''
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
    connection.query('INSERT INTO tablesUser(idUser, idTables) VALUES (?,?)', [idUser , idTable] , function (error, results, fields) {
        if (error) throw error;
        console.log('User %s joined table %s',idUser,idTable);
      });
  },

  //Add games to tables
  associateTableWithGames: function(idTable, idUser){
    //console.log("New player-table association %s %s", idTable, idUser);
    connection.query('INSERT INTO gamesTable(idGame, idTables) VALUES (?,?)', idTable , idUser , function (error, results, fields) {
        if (error) throw error;
        //console.log('User deleted ', idTable);
      });
  },

  //Add challenge to a set of challenges
  createChallenge: function(challenge, idSet){
    //console.log("New challenge %s added to %s", challenge, idSet);
    connection.query('INSERT INTO challenges(challenge, questionSetId) VALUES (?,?)', challenge , idSet , function (error, results, fields) {
        if (error) throw error;
      });
  },

  //Add a new set of challenges
  createChallengeSet: function(challenge){
    //console.log("New questionSet %s added", challenge);
    connection.query('INSERT INTO questionSet(challenge) VALUES (?)', challenge , function (error, results, fields) {
        if (error) throw error;
      });
  },

  //Add new table
  deleteNewGameTable: function(nameTable){
    //console.log("New game table created %s", nameTable);
    connection.query('DELETE FROM tables WHERE name = ?', nameTable , function (error, results, fields) {
        if (error) throw error;
        console.log('Game table deleted '+ nameTable);
      });
  },

  existsUser: function(nameUser){
    console.log("Checking if user exists");
    return new Promise(function (fulfill, reject){
      connection.query('SELECT COUNT(*) AS numero FROM users WHERE name = ?', nameUser, function(error, results, fields){
        if (error) throw(error);
        else fulfill(results);
      });
    });
 },

  existsTable: function(nameTable){
    //console.log("checking table " + nameTable);
      return new Promise(function (fulfill, reject){
        connection.query('SELECT COUNT(*) AS numero FROM tables WHERE name = ?', nameTable, function(error, results, fields){
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  updateUserToken: function(nameUser, sessionToken){
    //console.log("Updating token of user " + nameUser);
    connection.query('UPDATE users SET session_token = ? WHERE name = ?' , [sessionToken , nameUser], function (error, results, fields) {
        if (error) throw error;
      });
  },

  getUserId: function(nameUser,nameTable){
    //console.log("Get id user from database");
    return new Promise(function (fulfill, reject){
    connection.query('select id from users where name = ?; select id from tables where name = ?' , [nameUser, nameTable],  function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getTableId: function(nameTable){
    //console.log("Get id user from database");
    return new Promise(function (fulfill, reject){
    connection.query('select id from tables where name = ?' , nameTable,  function (error, results, fields) {

        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getTableNameByUserName: function(nameUser){
    //console.log("Get table name from user from database");
    return new Promise(function (fulfill, reject){
    connection.query('SELECT t.name from tables t, users u, tablesusers tu WHERE t.id = tu.idTables and u.id = tu.idUser and u.name = ?' , nameUser,  function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getTablePlayers: function(nameUser){
    //console.log("Get table name from user from database");
    return new Promise(function (fulfill, reject){
    connection.query('SELECT u.name from users u, tablesuser tu WHERE tu.idTables = (select tu.idTables from tablesuser tu, users u where tu.idUser = u.id and u.name = ?) and u.id = tu.idUser' , nameUser,  function (error, results, fields) {
        if (error) throw(error);
        else fulfill(results);
      });
    });
  },

  getTokenTablePlayers: function(nameUser){
    //console.log("Get table name from user from database");
    return new Promise(function (fulfill, reject){

    connection.query('SELECT u.session_token from users u, tablesuser tu WHERE tu.idTables = (select tu.idTables from tablesuser tu, users u where tu.idUser = u.id and u.name = ?) and u.id = tu.idUser;' , nameUser,  function (error, results, fields) {

        if (error) throw(error);
        else fulfill(results);
      });
    });
  },
  getTableIdFromPlayer: function(nameUser){
    //console.log("Get id user from database");
    return new Promise(function (fulfill, reject){
    connection.query('SELECT idTables FROM tablesuser WHERE idUser IN ( SELECT id FROM users WHERE name = ?)' , nameUser,  function (error, results, fields) {

        if (error) throw(error);
        else fulfill(results);
      });
    });
  },
  getUsersFromTableId: function(idTable){
    return new Promise(function (fulfill, reject){
      connection.query('SELECT u.name FROM users u, tablesuser t WHERE t.idUser = u.id AND t.idTables = ?', idTable, function (error, results, fields){
        if(error) throw(error);
        else fulfill(results);
      });
    });
  }
//
}
