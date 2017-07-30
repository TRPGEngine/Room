const debug = require('debug')('trpg:component:room');
const event = require('./lib/event');

module.exports = function RoomComponent(app) {
  initSocket.call(app);
}

function initSocket() {
  let app = this;
  app.on('connection', function(socket) {
    let wrap = {app, socket};
    socket.on('room::join', event.join.bind(wrap));
    socket.on('room::joinSub', event.joinSub.bind(wrap));
    socket.on('room::leave', event.leave.bind(wrap));
  });
}
