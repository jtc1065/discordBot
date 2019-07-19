const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'ud',
  description: 'Finds urban dictionary definition for a word or words',
  async execute(msg, args) {
    var word = ''
    while (!(args.length === 0)) {
      word = word.concat(args.shift().toLowerCase()) + ' '
    }
    const body = await fetch('http://api.urbandictionary.com/v0/define?term=' + word).then(response => response.json());

    var index = this.getRandomInt(body.list.length)

    if (body.list[index] == null || body.list[index].definition == null) {
      msg.channel.send("No definitions found")
      return
    }
    while (body.list[index].definition.length > 2000) {
      index = this.getRandomInt(body.list.length)
    }
    /*if (body.list[index] == null || body.list[index].definition == null) {
      msg.channel.send('No definitions found!')
      return;
    }*/
    var def = body.list[index].definition.replace(/\[/g, '')
    def = def.replace(/\]/g, '')
    var ex = body.list[index].example.replace(/\[/g, '')
    ex = ex.replace(/\]/g, '')
    var entry = body.list
    if (ex.length === 0) {
      ex = 'No examples found'
    }

    var output = ('__**Word**__\n' + entry[index].word + '\n' + '__**Definition**__\n' + def + '\n' + '__**Example**__\n' + ex + '\n' + '__**Rating**__\n' + entry[index].thumbs_up + ' thumbs up, ' + entry[index].thumbs_down + ' thumbs down')
    //Rich embeds cause visual issues for android users so this is removed for now and replaced with a normal message formatted similarly
    /*const embed = new Discord.RichEmbed()
      .setColor('#125456')
      .setTitle(entry[index].word)
      .setURL(entry[index].permalink)
      .addField('Definition', def)
      .addField('Example', ex)
      .addField('Rating', entry[index].thumbs_up + ' thumbs up, ' + entry[index].thumbs_down + ' thumbs down');*/
    msg.channel.send(output)

  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}