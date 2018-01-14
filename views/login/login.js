
var socket = io();


function connect(){
  socket.emit("login", document.getElementById("nick").value);

}

socket.on("resp_login", function(pass, nick){
  console.log(pass, nick)
  if(pass){
    sessionStorage.setItem("nick", nick);
    window.location.href = "/search/search.html";
  }else{
    document.getElementById("repeted-username").innerHTML = "Nickname already exists :]"
  }
})
