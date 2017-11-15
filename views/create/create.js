var socket = io()

function create(){
  var name = document.getElementById("to_create").value
  socket.emit("create_table", name)
}

socket.on("resp_create", function(valid){
  if(valid){
    window.location.href = "/search/search.html";
  }else{
    document.getElementById("error").innerHTML = "Table name already exists sorry juju"
  }
})
