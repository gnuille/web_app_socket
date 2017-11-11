var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.33.204.140',
  user     : 'test',
  password : 'maincra',
  database : 'drinking_game'
});
connection.connect();

module.exports = {
  newConnection: function(id){
    console.log("new user conected %s", id);
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
      });
  }
}
