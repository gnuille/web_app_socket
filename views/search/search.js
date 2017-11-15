socket = io();

function writeTables(res){
  $('#list').empty();
  var html = '<tr>';
  for (var i = 0; i < res.length; ++i) {
      var name = res[i].name;
      html += '<td>'+name+'</td>' + '<td><button id=\''+name+'\' onClick="joinLob(this.id)">Join!</button></td> </tr>' + '<tr>' ;
  };
  $('#list').append(html);
}

function search(){
  socket.emit("gather_tables", document.getElementById("key").value)
}

function joinLob(tablename){
  //read nick cookie
  socket.emit("join_lobby", tablename)
}

socket.emit("gather_tables", "")

socket.on("tables", writeTables)
