const uuid = require('uuid/v1');

module.exports = function Group(orm, db) {
  var Group = db.define('room_group', {
    name: {type: 'text', required: true},
    uuid: {type: 'text', required: false},
    avatar_url: {type: 'text', required: false},
    info: {type: 'object', defaultValue: '{}'},
    template: {type: 'object', defaultValue: '[]'},
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
      },
      getTemplate: function(templateName) {
        return this.template[templateName] || {};
      }
    }
  });
  let User = db.models.player_user;
  if(!!User) {
    Group.hasOne('owner', User);
    Group.hasMany('manager', User);
  }
  let Actor = db.models.player_actor;
  if(!!Actor) {
    Group.hasMany('remember', Actor);
  }

  return Group;
}
