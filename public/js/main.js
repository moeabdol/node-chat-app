$(document).ready(function() {
  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to server');
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var source = $('#message-template').html();
    var template = Handlebars.compile(source);
    var html = template({
      from: message.from,
      text: message.text,
      createdAt: formattedTime
    });

    $('#messages').append(html);
  });

  socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var source = $('#location-message-template').html();
    var template = Handlebars.compile(source);
    var html = template({
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });

    $('#messages').append(html);
  });

  var messageTextBox = $('[name=message]');
  $('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function() {
      messageTextBox.val('');
    });
  });

  var locationButton = $('#send-location');
  locationButton.click(function() {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(
      function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      function() {
        locationButton.removeAttr('disabled').text('Send location');
        return alert('Unable to fetch location!');
      }
    );
  });
});
