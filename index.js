const debug = require('debug')('trpg:component:room');
const event = require('./lib/event');

module.exports = function RoomComponent(app) {
  initStorage.call(app);
  initSocket.call(app);
}

function initStorage() {
  let app = this;
  let storage = app.storage;
  storage.registerModel(require('./lib/models/room.js'));
  storage.registerModel(require('./lib/models/group.js'));
  storage.registerModel(require('./lib/models/channel.js'));

  app.on('initCompleted', function(app) {
    // 数据信息统计
    debug('storage has been load 3 room db model');
  });
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
