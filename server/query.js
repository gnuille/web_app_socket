var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'test',
  password : 'maincra',
  database : 'drinking_game'
});
connection.connect();

module.exports = {
  newConnection: function(nameUser){
    console.log("new user conected %s", nameUser);
    connection.query('INSERT INTO users(name) VALUES (?)', nameUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User created ', nameUser);
      });
  },
  deleteConnection: function(nameUser){
    console.log("new user conected %s", idUser);
    connection.query('DELETE FROM users WHERE name = ?', nameUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', nameUser);
      });
  },
  createNewGameTable: function(nameTable){
    console.log("New game table created %s", idTable);
    connection.query('INSERT INTO tables(name) VALUES (?)', nameTable , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', nameTable);
      });
  },
  getAllUsers: function(nameTable){
    console.log("New game table created %s", nameTable);
    connection.query('select * from users' , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', results);
      });
  },
  associatePlayerWithTable: function(idTable, idUser){
    console.log("New player-table association %s %s", idTable, idUser);
    connection.query('INSERT INTO tablesUser(idUser, idTables) VALUES (?,?)', idTable , idUser , function (error, results, fields) {
        if (error) throw error;
        console.log('User deleted ', idTable);
      });
  },


}
