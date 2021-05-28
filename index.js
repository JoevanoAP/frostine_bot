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
        .setColor('96fff5')
        message.channel.send(help)
    })

    command(frostine, 'info', message => {
        const info = new Discord.MessageEmbed()
        .setTitle('Bot Information')
        .addField('Developer/Author', config.author, true)
        .addField('Bot Version', config.version, true)
        .setColor('96fff5')
        message.channel.send(info)
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