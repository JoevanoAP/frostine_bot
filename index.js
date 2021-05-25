const Discord = require('discord.js')
const frostine = new Discord.Client()
const config = require('./config.json')

frostine.on('ready', () => {
    console.log('Bot Online')
})

frostine.login(config.token)