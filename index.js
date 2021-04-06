const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./botconfig.json");
let statuses = ['🗯️!help🗯️', '🔑!cmds🔑', '🖥️discord.gg/8wBgDk3🖥️', 'Prefix: !', 'Partners: discord.gg/dQWyBmeRgr', 'Version 1.3.0'];
setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setPresence({
        activity: {
            name: status
        },
        status: 'online'
    });
}, 5000)

//Reads Events Folder
client.config = config;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Loading ${eventName} Event...`);
    });
});

//Reads Commands Folder
client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading ${commandName}...`);
        client.commands.set(commandName, props);
    });
});

//Custom Prefix Things
const default_prefix = config.default_prefix
const db = require("quick.db")
client.on("message", async message => {
    if (!message.guild) return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = default_prefix;
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command)
        command.run(client, message, args);
});

client.on('message', message => {
    if (message.content.startsWith("!prefix")) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        message.reply(`The Prefix for **${message.guild.name}** is set to **${prefix}**`)
    }
})


bot.login("NjU4NjcwMTY1MzY5ODE1MDYx.XgDIZA.6tr6LUjgumnrwz4jmpkyJzs4VzM");