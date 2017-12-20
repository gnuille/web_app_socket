function add_challenge(){
  let quest = document.getElementById("challenge").value;
  let room = sessionStorage.getItem("room");
  socket.emit("new challenge", quest, room);
}
