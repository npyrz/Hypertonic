const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
    description: 'View Info on a specific Member!',
    usage: 'userinfo <@HypnoticSiege>'
}

module.exports.run = async(client, message, args) => {
        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.find((u) => u.id === args[0]) ||
            message.member;
        const nickname = member.nickname || "*No Nickname!*";
        const accountCreated = moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY");
        const JoinedDate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY");
        const avatar =
            member.user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 4096,
            }) || "*No Avatar!*";
        const bot = member.user.bot ? "Yes" : "No";
  const roles = member.roles.cache.array().length
    ? member.roles.cache
        .array()
        .filter((role) => role.name !== "@everyone")
        .join(", ")
    : "*None*";
  const highestRole = member.roles.highest || "*None*";
  const embed = new client.embed()
    .setTitle(member.user.tag)
    .setThumbnail(avatar)
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`)
    .setTimestamp()
    .addFields(
      {
        name: "**Nickname**",
        value: nickname,
        inline: true,
        name: "**Account Creation:**",
        value: accountCreated,
        inline: true,
      },
      {
        name: "**Joined Server On:**",
        value: JoinedDate,
        inline: true,
      },
      {
      name: "**Highest Role:**",
      value: highestRole,
      inline: true,
    },
    {
        name: "**Bot:**",
        value: bot,
        inline: true,
      },
      {
        name: "**ID:**",
        value: member.user.id,
        inline: true,
      },
      {
        name: "**Roles:**",
        value: roles,
        inline: true,
      }
    );
  message.channel.send(embed);
}