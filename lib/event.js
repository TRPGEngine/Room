const debug = require('debug')('trpg:component:room:event');

exports.join = function join(data, cb) {
  let app = this.app;
  let socket = this.socket;
  try {
    let room = data.room;
    if(!!room) {
      throw new Error('have not received room data');
    }
    socket.join(room);

    if(!!app.player) {
      // TODO 获取玩家信息并修改房间记录
    }

    if(!!cb) {
      let roomList = socket.sockets.manager.roomClients[socket.id];
      cb({result: true, roomList});
    }
  } catch (e) {
    debug(e);
    if(!!cb) {
      cb({result: true, msg: '加入房间失败'});
    }
  }
}

exports.joinSub = function joinSub(data, cb) {
  let app = this.app;
  let socket = this.socket;
}

exports.leave = function leave(data, cb) {
  let app = this.app;
  let socket = this.socket;

  try {
    let room = data.room;
    if(!!room) {
      throw new Error('have not received room data');
    }
    socket.leave(room);

    if(!!app.player) {
      // TODO 获取玩家信息并修改房间记录
    }

    if(!!cb) {
      let roomList = socket.sockets.manager.roomClients[socket.id];
      cb({result: true, roomList});
    }
  } catch (e) {
    debug(e);
    if(!!cb) {
      cb({result: true, msg: '离开房间失败'});
    }
  }
}
