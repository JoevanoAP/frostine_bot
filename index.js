const Discord = require('discord.js')
const frostine = new Discord.Client()
const fs = require('fs')
frostine.command = new Discord.Collection()

const config = require('./config.json')
const command = require('./handlers/command.js')
const button = require('discord-buttons')

frostine.on('ready', () =>  {
    console.log('Frostine Online!!')
    button(frostine)

    command(frostine, 'help', (msg) => {
        const help = new Discord.MessageEmbed()
        .setTitle('Frostine Bot Plugin Commands')
        .setDescription('Welcome to Frostine Bot!! Prefix (+)')
        .setURL('https://discord.gg/3WP23B6Fx2')
        .setAuthor(msg.author.username, msg.author.avatarURL({dynamic: true}), msg.author.displayAvatarURL())
        .setThumbnail('https://i.postimg.cc/BnmBRRhh/Pics-Art-06-15-08-23-25.jpg')
        .setTimestamp()
        .setColor('AQUA')
        .setFooter('Frostine')
        .addFields({
            name: 'Admin Commands',
            value: '+admin'
        }, {
            name: 'Moderator Commands',
            value: '+mod'
        }, {
            name: 'Member Commands',
            value: '+member'
        })

        msg.channel.send(help)
    })

    command(frostine, 'admin', (msg) => {
        const admin_help = new Discord.MessageEmbed()
        .setTitle('Admin Commands')
        .setDescription('Only Admin and CEO can access!! Prefix (+)')
        .setURL('https://discord.gg/3WP23B6Fx2')
        .setAuthor(msg.author.username, msg.author.avatarURL({dynamic: true}), msg.author.displayAvatarURL())
        .setThumbnail('https://i.postimg.cc/BnmBRRhh/Pics-Art-06-15-08-23-25.jpg')
        .setTimestamp()
        .setColor('AQUA')
        .setFooter('Frostine')
        .addFields({
            name: 'status',
            value: `Change status bot!! (**Don't use it frequently!!**)`
        })

        msg.channel.send(admin_help)
    })


    command(frostine, 'ping', (msg) => {
        const ping = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL({dynamic: true}), msg.author.displayAvatarURL())
        .setThumbnail('https://i.postimg.cc/BnmBRRhh/Pics-Art-06-15-08-23-25.jpg')
        .addField('Pong!!', `${Math.round(frostine.ws.ping)}ms, The Bot Ping`)
        .setTimestamp()
        .setColor('AQUA')

        msg.channel.send(ping)
    })
    
    command(frostine, 'status', (msg) => {
        const talkedRecently = new Set()
        if(talkedRecently.has(msg.author.id)){
            msg.channel.send(`**Cooldown**, 1 Minute!!`)
        } else {
            talkedRecently.add(msg.author.id)
            setTimeout(() => {
                talkedRecently.delete(msg.author.id)
            }, 60000)
        }

        if(msg.member.roles.cache.has('849250745660080128') || msg.member.hasPermission('ADMINISTRATOR')){
            const content = msg.content.replace('+status ', '')

            frostine.user.setPresence({
                activity: {
                    name: content,
                    type: 0,
                },
            })
            if(content){
                msg.reply('Status Changed!!')
            } 
        } else{
            const notPerms = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL({dynamic: true}))
            .addField('How dare you to use this command!!', 'Missing Permission!!')
            .setColor('RED')
            .setTimestamp('')

            message.channel.send(notPerms) 
        }

    })
})

frostine.login(config.token)