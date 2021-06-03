const Discord = require('discord.js')
const frostine = new Discord.Client()
const config = require('./config.json')
const command = require('./commands.js')

frostine.on('ready', () => {
    console.log('Bot Online')

    command(frostine, 'ping', (message) => {
        message.reply('Frostine Bot !!')
    })

    command(frostine, 'invite', (message) => {
        const invite_link = config.invite
        message.reply(invite_link)
    })

    command(frostine, 'help', (message) => {
        const help = new Discord.MessageEmbed()
        .setTitle('Frostine Bot Plugins Commands')
        .addField('Help Commands', 'ping | invite | info')
        .setColor('96fff5')
        message.channel.send(help)
    })

    command(frostine, 'info', (message) => {
        const info = new Discord.MessageEmbed()
        .setTitle('Bot Information')
        .addField('Developer/Author', config.author)
        .addField('Bot Version', config.version)
        .setColor('96fff5')
        message.channel.send(info)
    })

    command(frostine, 'nuke', (message) => {
        if(message.member.hasPermission('ADMINISTRATOR')){
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(frostine, 'status', (message) => {
        if(message.member.hasPermission('ADMINISTRATOR')){
            const content = message.content.replace('+status ', '')

            frostine.user.setPresence({
                activity: {
                    name: content,
                    type: 0,
                },
            })
        }
    })
/*
    const { prefix } = config
    frostine.user.setPresence({
        activity: {
            type: `WATCHING`,
            name: 'Frostine Server',
        },
    })  
*/
})

frostine.login(config.token)