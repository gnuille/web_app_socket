

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
  var nick = sessionStorage.getItem("nick")
  socket.emit("enter",nick, tablename)
}

socket = io();
socket.emit("gather_tables", "")

socket.on("tables", writeTables)

socket.on("redirectLobby", function(){
  window.location.href = "/lobby/lobby.html"
})
