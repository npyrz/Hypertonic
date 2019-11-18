const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const prefix = botconfig.prefix;
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.prefix = prefix;
bot.config = botconfig;
const CurrentTimers = new Map();
const client = new Discord.Client();


bot.on("ready", async () => {
   console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
   bot.user.setActivity("🚧Being Worked On🚧", {type: "PlAYING"});
 
 });
 
 bot.on("message", async message => { 
   if(message.author.bot) return;
   if(message.channel.type === "dm") return;
   if(!message.content.startsWith(prefix)) return;
   if(!CurrentTimers.get(message.guild.id)){ CurrentTimers.set(message.guild.id, new Map()); };
 
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);
   let commandfile = bot.commands.get(cmd.slice(prefix.length));
   if(commandfile) return commandfile.run(bot,message,args,CurrentTimers);
 
 });

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  
  jsfile.forEach((f, i) =>{
   let props = require(`./commands/${f}`);
   console.log(`${f} loaded!`);
   bot.commands.set(props.help.name, props);
 });

 bot.on("guildMemberAdd", async member => {
  let welcomechannel = bot.channels.get("635158154736566283")
  welcomechannel.send(`Welcome ${member}, thank you for joining **__Nava Support Server__**! If you have any questions/suggestions/feedback/reports this is the right place. Please use the correct channels for those purposes! Once again thanks for joining **__Nava Support Server__**!!!`)
  member.addRole("635136075148296193")
});

});






client.once('ready', () => console.log('READY!'));
client.on('message', message => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});












bot.login('NjE3Nzg0NzUzNDgyODkxMzE2.XdMRYg.t278541pY10cOjTciFdyBtF1_Zc');