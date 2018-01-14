var socket = io();

socket.emit("join_room", sessionStorage.getItem("nick"))

socket.on("update_room_players", function(room) {
  sessionStorage.setItem("room", room)
  socket.emit("get_room_players", room)
})

socket.on("data_ready", function(info) {
  $('#list').empty();
  var html = '<tr>';
  console.log(info)
  for (var i = 0; i < info.length; ++i) {
    console.log(i + " " + info[i].nick)
    html += '<td>' + info[i].nick + '</td>' + '</tr>' + '<tr>';
  };
  $('#list').append(html);
})

function begin_default(){

}

function begin_custom(){
  socket.emit("begin_custom", sessionStorage.getItem("room"))
  window.location.href="/addretos/addretos.html"
}
