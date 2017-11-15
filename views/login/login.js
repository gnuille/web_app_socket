
var socket = io();

function connect(){
  socket.emit("login", document.getElementById("nick").value);

}

socket.on("resp_login", function(pass, nick){

  if(pass){
    document.cookie="nick="+nick;
    window.location.href = "/search/search.html";
  }else{
    document.getElementById("repeted-username").innerHTML = "Nickname already exists :]"
  }
})