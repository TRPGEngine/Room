const app = require('../../Core/')();
const player = require('../../Player/');
const room = require('../');

app.load(player);
app.load(room);
app.run();
// app.reset();
app.close();
