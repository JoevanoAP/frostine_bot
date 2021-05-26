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

if(command){
    command(frostine, 'help', message => {
        const help = new Discord.MessageEmbed()
        .setTitle('Frostine Bot Plugins Commands')
        .setDescription('Prefix (+)')
        .addField('help commands', 'to see all commands', true)
        .addField('help moderator', 'to see all moderator commands', true)
        .setColor('69fff0');
        message.channel.send(help);
    })
} else {
    command(frostine,'help commands', message => {
        const help_commands = new Discord.MessageEmbed()
        .setTitle('Commands Plugin')
        .setDescription('This command allowed for all members')
        .addField('ping', 'to check bot online or not')
        .setColor('69fff0')
        message.channel.send(help_commands)
    })
}

frostine.login(config.token)