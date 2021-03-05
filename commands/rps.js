
const Discord = require("discord.js");
const { promptMessage } = require("../reactions.js");
const chooseArr = ["🗿", "📜", "✂"];
exports.run = async (client, message, args, tools) => {
            let embed = new Discord.MessageEmbed()
            .setAuthor(`Rock, Paper, Scissors`)
            .setColor("#0e2b82")
            .setDescription("**Add a reaction to one of these emojis to play the game!**")
            .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
        const result = await getResult(reacted, botChoice);
        embed
            .setDescription("**Add a reaction to one of these emojis to play the game!**")
            .addField(result, `You chose ${reacted}, and I chose ${botChoice}`);
        m.edit(embed);
        function getResult(me, clientChosen) {
            if ((me === "🗿" && clientChosen === "✂") ||
                (me === "📜" && clientChosen === "🗿") ||
                (me === "✂" && clientChosen === "📜")){return "You won!";}
            else if (me === clientChosen){return "It's a tie!";}
             else {return "You lost!"}}}
module.exports.help = {
    name: "rps"
}