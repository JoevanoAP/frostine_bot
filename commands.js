const { prefix } = require('./config.json')

//ping
module.exports = (frostine, aliases, callback) => {
    if(typeof aliases === 'string'){
        aliases = [aliases]
    }
}

frostine.on('message', message => {
    const { content } = message;

    aliases.forEach(alias => {
        const command = `${prefix}${alias}`

        if(content.startsWith(`${command}`) || content === command){
            console.log(`Running the command ${command}`)
            callback(message)
        }
    })
})
