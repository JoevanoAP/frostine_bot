const Discord = require('discord.js')
const frostine = new Discord.Client()
const config = require('./config.json')
const command = require('./commands.js')

frostine.on('ready', () => {
    console.log('Bot Online')
})

command(frostine, 'ping', message => {
    message.channel,send('Heyy!! Im Here!! What you want to do?')
})

client.login(config.token)