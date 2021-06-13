const Discord = require('discord.js')
const frostine = new Discord.Client()

const config = require('./config.json')
const command = require('./utillity/prefix_perma.js')


frostine.on('ready', () => {
    console.log('Bot Online')

    // ----------> Start Commands of Server <----------//
    //Help Command//
    command(frostine, 'help', (message) => {
        const help = new Discord.MessageEmbed()
        .setTitle('Frostine Bot Plugins Commands')
        .setDescription('Frostine Bot!! Prefix (+)')
        .addField('Commands For Members', '+member')
        .addField('Admin Commands', '+admin')
        .addField('Moderators Commands', '+mod')
        .setColor('96fff5')
        message.channel.send(help)
    })
    //Help Command//

    //---------- ~ Help Command (Members) ~ ----------//
    command(frostine, 'member', (message) => {
        const help_member = new Discord.MessageEmbed()
        .setTitle('Members Commands')
        .setAuthor('', '')
        .setDescription('Commands that members can access | Prefix (+)')
        .addFields({
            name: 'ping',
            value:'Display the bot ping (ms)',
        }, {
            name: 'info',
            value: 'To access Bot Information',
        }, {
            name: 'invite',
            value: 'Invite Link Frostine Team Server',
        }, {
            name: 'avatar',
            value: 'Displaying User Avatar / Members Avatar (alpha) | +avatar (@member)',
        }, {
            name: 'games',
            value: 'To see games that frostine bot have',
        })
        .setColor('GREEN')
        .setTimestamp()
        
        message.channel.send(help_member)
    })

    //---------- Ping Command ----------//
    command(frostine, 'ping', (message) => {
        +message.channel.send(`**${frostine.ws.ping}ms**, Bot Ping!!`)
    })
    //---------- Ping command ----------//

    //---------- Info command ----------//
    command(frostine, 'info', (message) => {
        const info = new Discord.MessageEmbed()
        .setTitle('Bot Information')
        .addField('Developer/Author', config.author)
        .addField('Bot Version', config.version)
        .setColor('96fff5')
        message.channel.send(info)
    })
    //---------- Info command ----------//

    //---------- Invite command ----------//
    command(frostine, 'invite', (message) => {
        const invite_link = config.invite
        message.reply(invite_link)
    })
    //---------- Invite command ----------//

    //---------- Avatar command ----------//
    command(frostine, 'avatar', (message) => {
        const target = message.mentions.users.first()
        const avatar = new Discord.MessageEmbed()
        .setTitle(target.tag + ' Avatar')
        .setImage(target.avatarURL({dynamic: true}))
        .setColor('RANDOM')
        .setFooter(`${message.author.username}`)

        message.channel.send(avatar)

    })
    //---------- Avatar command ----------//

    //---------- ~ Games command ~ ----------//
    command(frostine, 'games', (message) => {
        const games = new Discord.MessageEmbed()
        .setTitle('Games!!')
        .setDescription('Games that author make!! Prefix (+)')
        .addFields({
            name: 'ttt',
            value: 'Tic Tac Toe Games | +ttt (@member)'
        })
        .setColor('RANDOM')

        message.channel.send(games)
    })
    
    //---------- TTT command ----------//
    command(frostine, 'ttt', (message) => {
        const { tictactoe } = require('reconlx')
        const member = message.mentions.members.first()

        if(!member){
            const ttt = new Discord.MessageEmbed()
            .addField('Upss!! Wrong Syntax', 'Please Specify the Members')
            .setColor('RED')
            message.channel.send(ttt)
        } else if (member === null){
            const ttt = new Discord.MessageEmbed()
            .addField('Upss!! Wrong Syntax', 'Please Specify the Members')
            .setColor('RED')
            message.channel.send(ttt)
        }
        new tictactoe({
            player_two: member,
            message: message
        })
    })
    //---------- TTT command ----------//
    //---------- ~ Games command ~ ----------//
    //---------- ~ Help Command (Members) ~ ----------//


    //---------- ~ Help Command (Admin/CEO) ~ ----------//
    command(frostine, 'admin', (message) => {
        if(message.guild.roles.cache.find(r => r.id === '849250745660080128')){
            const admin_command = new Discord.MessageEmbed()
            .setTitle('Admin Commands')
            .setDescription('Just Admin/CEO can use this command!! Prefix (+)')
            .addFields({
                name: 'status',
                value: 'Change bot status (WARNING DONT USE THIS COMMAND / SPAM THIS COMMAND)'
            }, {
                name: 'roles',
                value: 'Display all Frostine Team Roles'
            }, {
                name: 'data',
                value: 'Get Members Data!! (+data (@member))' 
            })

            message.channel.send(admin_command)
        } else {
            message.reply('How dare you to use this command!!')
        }
    })

    //---------- Status Command ----------//
    command(frostine, 'status', (message) => {
        if(message.guild.roles.cache.find(r => r.id === '849250745660080128')){
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
    //---------- Status Command ----------//
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
    //---------- Status Command ----------//

    //---------- Status Command ----------//
    //---------- ~ Help Command (Admin/CEO) ~ ----------//
    
})

frostine.login(config.token)