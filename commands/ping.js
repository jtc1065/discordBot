const util = require('../utility.js')
module.exports = {
  name: 'ping',
  description: 'Ping!',
  array: ['1','2','three'],
  execute(msg, args) {
    msg.channel.send("Pong.")
  }
};
