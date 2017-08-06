const uuid = require('uuid/v1');

module.exports = function Channel(orm, db) {
  var Channel = db.define('room_group', {
    name: {type: 'text', required: true},
    uuid: {type: 'text', required: false},
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

    }
  });
  let Group = db.models.room_group;
  if(!!Group) {
    Channel.hasOne('owner_group', Group);
  }
  let Actor = db.models.player_actor;
  if(!!Actor) {
    Channel.hasMany('remember', Actor);
  }

  return Channel;
}
