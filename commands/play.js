const ytdl = require("ytdl-core")

exports.run = async (client, message, args, ops) => {
  if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel!");
  
  if(message.guild.me.voiceChannel) return message.channel.send("sorry the bot is already in the channel");

  if(!args[0]) return message.channel.send("sorry please put a URL after the command kid!")

  let validate = await ytdl.validateURL(args[0]);

  if (!validate) return message.channel.send("Sorry please input a vaild URL for the command");

  let info = await ytdl.getInfo(args[0]);

  let connection = await message.member.voiceChannel.join();

  let dispatcher = await connection.play(ytdl(args[0], { filter: "audioonly"}));

  message.channel.send(`Now Playing: ${info.title}`);


  
  
  
};
