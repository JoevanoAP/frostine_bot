module.exports = {
    commands: 'giverole',
    minArgs: 2,
    expectedArgs: "<Target user's @> <The role name>",
    permissions: "ADMINISTRATOR",
    callback: (message, args) => {
        const targetUser = message.mentions.users.first()
        if(!targetUser){
            message.reply('Please specify someone to give a role')
            return
        }

        args.shift()
        const { guild } = message
        
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if(!role){
            message.reply(`There's no role with the name "${roleName}"`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        member.roles.add(role)

        message.reply(`That user now has the "${roleName}"`)
    }
}