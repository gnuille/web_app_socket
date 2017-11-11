var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'test',
  password : 'maincra',
  database : 'drinking_game'
});
connection.connect();

module.exports = {
  //Add user
  newConnection: function(nameUser){
    console.log("new user conected %s", nameUser);
    connection.query('INSERT INTO users(name) VALUES (?)', nameUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User created ', nameUser);
      });
  },
  //Delete user
  deleteConnection: function(nameUser){
    console.log("new user conected %s", nameUser);
    connection.query('DELETE FROM users WHERE name = ?', nameUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', nameUser);
      });
  },
  //Add new table
  createNewGameTable: function(nameTable){
    console.log("New game table created %s", nameTable);
    connection.query('INSERT INTO tables(name) VALUES (?)', nameTable , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', nameTable);
      });
  },
  //Get users
  getAllUsers: function(){
    console.log("New game table created %s", nameTable);
    connection.query('select * from users' , function (error, results, fields) {
        if (error) throw error;
        console.log('All users ', results);
      });
  },
  //Add player to table
  associatePlayerWithTable: function(idTable, idUser){
    console.log("New player-table association %s %s", idTable, idUser);
    connection.query('INSERT INTO tablesUser(idUser, idTables) VALUES (?,?)', idTable , idUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', idTable);
      });
  },
  //Add games to tables
  associateTableWithGames: function(idTable, idUser){
    console.log("New player-table association %s %s", idTable, idUser);
    connection.query('INSERT INTO gamesTable(idGame, idTables) VALUES (?,?)', idTable , idUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', idTable);
      });
  },
  //Add challenge to a set of challenges
  createChallenge: function(challenge, idSet){
    console.log("New challenge %s added to %s", challenge, idSet);
    connection.query('INSERT INTO challenges(challenge, questionSetId) VALUES (?,?)', challenge , idSet , function (error, results, fields) {
        if (error) throw error;
      });
  },
  //Add a new set of challenges
  createChallenge: function(challenge){
    console.log("New challenge %s added", challenge);
    connection.query('INSERT INTO questionSet(challenge) VALUES (?)', challenge , function (error, results, fields) {
        if (error) throw error;
      });
  },
    //Add new table
  deleteNewGameTable: function(nameTable){
    console.log("New game table created %s", nameTable);
    connection.query('DELETE FROM tables WHERE name = ?', nameTable , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', nameTable);
      });
  },

}
