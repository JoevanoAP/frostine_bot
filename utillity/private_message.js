module.exports = (frostine, triggerText, replyText) => {
    frostine.on('message', message => {
        if(message.content.toLowerCase() === triggerText.toLowerCase()){
            message.author.send(replyText)
        }
    })
}