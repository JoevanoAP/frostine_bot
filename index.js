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

const help = command(frostine, 'help', message => {
    message.channel.send = new Discord.MessageEmbed()
    .setTitle('Frostine Bot Plugins Commands')
    .setDescription('Prefix (+)')
    .addField('help commands', 'to see all commands', true)
    .addField('help moderator', 'to see all moderator commands', true)
    .setColor('69fff0');
})

frostine.login(config.token)