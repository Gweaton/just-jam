$(document).ready(function(){
  var socket = io.connect();
  socket.emit('request_join', { id: "#{chat._id}" })

  $('#send-message').submit(function(e){
    e.preventDefault();
    socket.emit('send message', {
      message: $('#message').val(),
      room: "#{chat._id}",
      author: "#{jammer.name}"
    })
    $('#message').val('')
  })

  socket.on('new message', function(data){
    $('#all-messages').append("<p><b>" + data.author + "</b>: " + data.message + "</p>")
  })

})
