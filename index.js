const Discord = require('discord.js')
const frostine = new Discord.Client()
const config = require('./config.json')
const command = require('./commands.js')

frostine.on('ready', () => {
    console.log('Bot Online')
})

command(frostine, 'ping', message => {
    message.reply('Heyy!! Im Here!! What you want to do?')
})

frostine.login(config.token)