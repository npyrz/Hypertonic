const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = require("discord-prefix");
const bot = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
});
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#0e2b82",
        reaction: "🎉"
    }
});
const { registerEvents } = require('./handlers/events');
registerEvents(bot, '../events');
client.config = config;

let statuses = ['🗯️!help🗯️', '🔑!cmds🔑', '🖥️discord.gg/8wBgDk3🖥️', '📌!setprefix📌', `📲!setlogs📲`, 'Default Prefix: !', 'Version 1.3.3', 'Partners: discord.gg/dQWyBmeRgr'];
setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setPresence({
        activity: {
            name: status
        },
        status: 'online'
    });
}, 5000)

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Loading ${eventName} Event...`);
    });
});

client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loaded ${commandName}...`);
        client.commands.set(commandName, props);
    });
});

client.on('message', message => {
    if (message.content.startsWith("!prefix")) {
        let guildPrefix = prefix.getPrefix(message.guild.id);
        const embed = new Discord.MessageEmbed()
            .setColor("#0e2b82")
            .setDescription(`The default prefix for Hypertonic is \`\`!\`\` \nCurrent Server Prefix: \`\`${guildPrefix}\`\``)
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`);
        return message.channel.send({ embed })
    }
    if (message.content === '!ping') {
        const embed = new Discord.MessageEmbed()
            .setColor("#0e2b82")
            .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`)
        message.channel.send(embed);
    }
})

client.login(config.token);