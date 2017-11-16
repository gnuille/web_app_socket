var socket = io()

function create(){
  var name = document.getElementById("to_create").value
  socket.emit("create_table", name)
}

socket.on("resp_create", function(validn tablename){
  if(valid){
    var nick = sessionStorage.getItem("nick")
    socket.emit("enter",nick, tablename)
  }else{
    document.getElementById("error").innerHTML = "Table name already exists sorry juju"
  }
})

socket.on("redirectLobby", function(){
  window.location.href = "/lobby/lobby.html"
})
