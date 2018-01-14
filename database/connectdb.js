var mysql = require('mysql');

module.exports = {
  //Add user
  newconection: function(){
    var a = mysql.createConnection({
      multipleStatements: true,
      //debug    : true,
      host     : 'us-cdbr-sl-dfw-01.cleardb.net',
      user     : 'ba6f57bed71278',
      password : 'aa8200a1',
      database : 'ibmx_32dfec4ca009a8b'
    });

    return a;
  }
}
