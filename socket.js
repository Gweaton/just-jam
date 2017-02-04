$(document).ready(function(){
  console.log("JQUIZZLE")
  var socket = io.connect();

  $('#join-group').submit(function(e){
    e.preventDefault();
    socket.emit('request_join', { id: `${chat._id}` })
  })

  $('#send-message').submit(function(e){
    e.preventDefault();
    socket.emit('send message', {
      message: $('#message').val(),
      room: `${chat._id}`
    })

    $('#message').val('');
  })

  socket.on('new message', function(data){
    $('#chat').append(data + "<br/>")
  })

})
