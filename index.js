const Discord = require('discord.js')
const frostine = new Discord.Client()
const config = require('./config.json')
const command = require('./commands.js')

frostine.on('ready', () => {
    console.log('Bot Online')

    command(frostine, 'ping', message => {
        message.reply('Heyy!! Im Here!! What you want to do?')
    })
    
    if(command){
        //help
        command(frostine, 'help', message => {
            const help = new Discord.MessageEmbed()
            .setTitle('Frostine Bot Plugins Commands')
            .setDescription('Prefix (+)')
            .addField('help commands', 'to see all commands', true)
            .addField('help moderator', 'to see all moderator commands', true)
            .setColor('69fff0');
            message.channel.send(help);
        })
        //help commands
        if(command != 'help'){
            command(frostine, 'help commands', message => {
                const help_commands = new Discord.MessageEmbed()
                .setTitle('Commands Plugins')
                .setDescription('Commands that allowed all members to use!!')
                .addField('ping', '- To check bot online or offline')
                .setColor('69fff0')
                message.channel.send(help_commands)
            })   
        }
    } else{
        message.reply("Opss! try to see our plugins commands (+help)")
    }

    const { prefix } = config
    frostine.user.setPresence({
        activity: {
            name: `Use ${prefix}help`,
        },
    })  
})

frostine.login(config.token)