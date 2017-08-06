const uuid = require('uuid/v1');

module.exports = function Room(orm, db) {
  var Room = db.define('room_room', {
    name: {type: 'text', required: true},
    uuid: {type: 'text', required: false},
    avatar_url: {type: 'text', required: false},
    info: {type: 'object', defaultValue: '{}'},
    create_at: {type: 'date'}
  }, {
    hooks: {
      beforeCreate: function(next) {
        if (!this.uuid) {
  				this.uuid = uuid();
  			}
        if (!this.create_at) {
  				this.create_at = new Date().getTime();;
  			}
  			return next();
      }
    },
    methods: {
      setNotice: function(str) {
        this.info.notice = str;
      },
      getNotice: function() {
        return this.info.notice;
      }
    }
  });
  let User = db.models.player_user;
  if(!!User) {
    Room.hasOne('owner', User);
    Room.hasMany('manager', User);
  }
  let Actor = db.models.player_actor;
  if(!!Actor) {
    Room.hasMany('remember', Actor);
  }

  return Room;
}
