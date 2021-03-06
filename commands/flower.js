const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'flower',
  description: 'Display a random flower and prompt user for name of flower.',
  names: ["buttercup", "daffodil", "daisy", "poppy", "snowdrop", "tulip", "alstroemeria", "amaranthus", "amaryllis"],
  flag: false,
  execute(msg, args) {
    this.flag = false;
    const flowername = this.names[util.getRandomInt(this.names.length)]
    const index = util.getRandomInt(3)
    const attachment = new Discord.MessageAttachment('./assets/flowers/' + flowername + '/img' + index + '.png', 'img' + index + '.png')
    msg.channel.send('Guess this flower: ')
    msg.channel.send(attachment)
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
      time: 25000
    });
    collector.on('collect', message => {
      if (message.content.toLowerCase() == flowername) {
        if (flowername.startsWith('a')) {
          message.channel.send("Correct! That is an " + flowername);
        } else {
          message.channel.send("Correct! That is a " + flowername);
        }
      } else {
        message.channel.send("Incorrect! That is a " + flowername);
      }
      this.flag = true
      collector.stop()
    });
    collector.on('end', collected => {
      if (this.flag == false) {
        msg.channel.send("You did not answer. That was a " + flowername)
      }
    });
  }
};
