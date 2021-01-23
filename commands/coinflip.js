module.exports.run = async ( bot, message, args ) => {
    if (message.author.bot) return;

    
    var chosenValue = Math.random() < 0.5 ? heads : tails;

    message.channel.send(`${chosenValue}!`)
}




module.exports.help = {
    name: 'coinflip'
}