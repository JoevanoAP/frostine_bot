const Discord = require('discord.js')
const frostine = new Discord.Client()
const config = require('./config.json')
const command = require('./commands.js')

frostine.on('ready', () => {
    console.log('Bot Online')

    command(frostine, 'ping', message => {
        message.reply('Heyy!! Im Here!! What you want to do?')
    })

    command(frostine, 'invite', message => {
        const invite_link = config.invite
        message.reply(invite_link)
    })

    command(frostine, 'help', message => {
        const help = new Discord.MessageEmbed()
        .setTitle('Frostine Bot Plugins Commands')
        .addField('Help Commands', 'ping | invite')
        message.channel.send(help)
    })
    
    const { prefix } = config
    frostine.user.setPresence({
        activity: {
            type: `WATCHING`,
            name: `Frostine Server | ${prefix}help`,
        },
    })  
})

frostine.login(config.token)