const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./commands.js')

client.on('ready', () => {
    console.log('Bot Online')
})

command(client, 'ping', message => {
    message.channel,send('Heyy!! Im Here!! What you want to do?')
})

client.login(config.token)