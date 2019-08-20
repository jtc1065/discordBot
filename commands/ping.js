const util = require('../utility.js')
module.exports = {
  name: 'ping',
  description: 'Ping!',
  array: ['1','2','three'],
  execute(msg, args) {
    msg.channel.send(this.array[0]);
    //console.log(util.getRandomInt(5))
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
};
