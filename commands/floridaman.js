const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'floridaman',
  description: 'Displays random story about florida man',
  async execute(msg, args) {
    var offset = parseInt(util.getRandomInt(1000))
    const body = await fetch('https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?q=florida man&count=1000&offset=' + offset, {
      headers: {
        'X-RapidAPI-Host': 'microsoft-azure-bing-news-search-v1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.news_key //''
      }
    }).then(response => response.json());
    var index = parseInt(util.getRandomInt(100))
    while (body.value[index] == null) {
      index = parseInt(util.getRandomInt(100))
    }
    msg.channel.send('**' + body.value[index].name + '**\n\n' + body.value[index].description + '\n\nRead more here: <' + body.value[index].url + '>')
  },
};
