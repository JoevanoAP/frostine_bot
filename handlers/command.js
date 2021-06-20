const { prefix } = require('../config.json')

module.exports = (frostine, aliases, callback) => {
    if(typeof aliases === 'string'){
        aliases = [aliases]
    }

    frostine.on('message', message => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`

            if(content.startsWith(`${command}`) || content === command){
                console.log(`Running Command ${command}`)
                console.log(message.author.username)
                console.log('--------------------------------')
                callback(message)
            }
        })
    })
}
