const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient
const fetch = require('node-fetch');
const fs = require('fs');
const config = require('./config.json')
const util = require('./utility.js')
const dburl = process.env.dbconnection

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

var db, collection, command;

mongo.connect(dburl, {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  db = client.db('discordbot')
  collection = db.collection('piclinks')
})


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("w!help --> commands")
});

//command list
client.on('message', async msg => {
  util.initChecks(msg, client);
  //Remove the prefix from the command and split the commands into seperate arguments
  const args = msg.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  //initiate dynamic command handling
  if (config.users.includes(command)) {
    client.commands.get('namepic').execute(msg, args, command)
  } else {
    try {
      client.commands.get(command).execute(msg, args);
    } catch (error) {
      console.log(error)
      msg.reply('there was an error trying to execute that command! That command may not exist, you may have entered the command incorrectly, or the bot is having issues. \nIf you are trying to set your color, the format is: w!setcolor# hexcode');
    }
  }

});

//client.login('');
client.login(process.env.BOT_TOKEN);
