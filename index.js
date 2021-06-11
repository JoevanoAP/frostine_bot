const Discord = require('discord.js')
const frostine = new Discord.Client()

const config = require('./config.json')
const command = require('./utillity/prefix_perma.js')

const first_message = require('./utillity/first_message.js')


frostine.on('ready', () => {
    console.log('Bot Online')

    //utillity output
    //first_message(frostine, '849970160969449472', 'helloworlds!!!', ['❄'])
    //10/6/2021

    //ping command
    command(frostine, 'ping', (message) => {
        if(command){
           message.channel.send(`**${frostine.ws.ping}ms**, Bot Ping!!`)
        }
    })

    //invite command
    command(frostine, 'invite', (message) => {
        const invite_link = config.invite
        message.reply(invite_link)
    })

    //help command
    command(frostine, 'help', (message) => {
        const help = new Discord.MessageEmbed()
        .setTitle('Frostine Bot Plugins Commands')
        .addField('Help Commands', '``ping | invite | info``')
        .addField('Admin Commands', '``nuke | status | roles``')
        .addField('Moderators Commands', '``ban (alpha) | kick (alpha)``')
        .setColor('96fff5')
        message.channel.send(help)
    })

    //display roles
    command(frostine, 'roles', (message) => {
        if(message.member.hasPermission('ADMINISTRATOR')){
            var rolemap = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join("\n")
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";

            const roles_list = new Discord.MessageEmbed()
            .addField("Role List" , rolemap)
            .setColor('96fff5')
            message.channel.send(roles_list);
        }
        else{
            message.reply('How dare you to use this command!!')
        }
    })

    command(frostine, 'data', (message) => {
        
    })

    //info command
    command(frostine, 'info', (message) => {
        const info = new Discord.MessageEmbed()
        .setTitle('Bot Information')
        .addField('Developer/Author', config.author)
        .addField('Bot Version', config.version)
        .setColor('96fff5')
        message.channel.send(info)
    })

    //nuke command
    command(frostine, 'clear', (message) => {
        if(message.guild.roles.cache.find(r => r.id === '849250745660080128')){
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
            message.reply('100 Text Cleared!!')
            .then(message => {
                setTimeout (() => message.delete(), 5900)
            })
        } 
        else if(message.member.hasPermission('ADMINISTRATOR')){
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
            message.reply('100 Text Cleared!!')
            .then(message => {
                setTimeout (() => message.delete(), 5900)
            })
        } else{
            message.reply('How dare you to use this command!!')
        }
    })

    //status command
    command(frostine, 'status', (message) => {
        if(message.member.hasPermission('ADMINISTRATOR')){
            const content = message.content.replace('+status ', '')

            frostine.user.setPresence({
                activity: {
                    name: content,
                    type: 0,
                },
            })
            if(content){
                message.reply('Status Changed!!')
            }
        } else{
            message.reply('How dare you to use this command!!') 
        }
    })

    //ban command
    command(frostine, 'ban', (message) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`

        if(member.hasPermission('BAN_MEMBERS')){
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${tag} That user has been banned.`)
            } 
            else if(!mentions.users.first()){
                message.reply('+ban (@member)')
            } else {
                message.channel.send(`${tag} How dare you use this command!`)
            }
        }
    })

    //kick command
    command(frostine, 'kick', (message) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`

        if(member.hasPermission('KICK_MEMBERS')){
            const target = mentions.users.first()
            if(target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag} That user has been Kicked.`)
            } else if (!mentions.users.first()) {
                message.reply('+kick (@member)')
            }
            else{
                message.channel.send(`${tag} How dare you use this command!`)
            }
        }
    })

    const { prefix } = config
    frostine.user.setPresence({
        activity: {
            type: `PLAYING`,
            name: 'Frostine Server',
        },
    })  

})

frostine.login(config.token)