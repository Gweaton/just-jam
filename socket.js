$(document).ready(function(){
  var socket = io.connect();
  socket.emit('request_join', { id: "#{chat._id}" })

  $('#send-message').submit(function(e){
    e.preventDefault();
    socket.emit('send message', {
      message: $('#message').val(),
      room: "#{chat._id}",
      author: "#{user.name}"
    })
    $('#message').val('')
  })

  socket.on('new message', function(data){
    $('#chat-messages').append("<div class='msg'>" + data.author + ": " + data.message + "</div>")
  })

})
