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















bot.login('NjE3Nzg0NzUzNDgyODkxMzE2.XdMRYg.t278541pY10cOjTciFdyBtF1_Zc');