const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./strikes.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sorry, you you don't have permission to strike!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))
  
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!wUser) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Sorry, can't find the user your trying to strike!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  if (wUser.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Sorry, that user can not be striked!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  .then(m => m.delete({ timeout: 30000 }))
  
  let reason = args.join(" ").slice(22);
  if (!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  warns[wUser.id].warns++;
  fs.writeFile("./strikes.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });
  let warnEmbed = new Discord.MessageEmbed()
    .setTitle("Strike")
    .setColor("#0e2b82")
    .addField("Striked User", `<@${wUser.id}> ID: ${wUser.id}`)
    .addField("Striked By", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Striked In", message.channel)
    .addField("Number of Strikes", warns[wUser.id].warns)
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp()
    .addField("Reason", reason);

  message.channel.send(new Discord.MessageEmbed()
  .setDescription(`${wUser} has been striked for then reason ${reason}!`)
  .setColor("#0e2b82")
  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
  
  let warnchannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs');
    if (!warnchannel) return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Please create a `bot-logs` channel first!")
    .setColor("#0e2b82")
    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    .then(m => m.delete({ timeout: 30000 }));

  switch (warns[wUser.id].warns) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      warnchannel.send(warnEmbed);
      break;
    case 10:
      warnchannel.send(warnEmbed);
      if (warns[wUser.id].warns == 10) {
        let muterole = message.guild.roles.find(`name`, "muted");
        if (!muterole) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Sorry, please notify server staff to create a role named `muted`!")
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }));


        let mutetime = "3600s";
        await (wUser.addRole(muterole.id));
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

        setTimeout(function () {
          wUser.removeRole(muterole.id)
          message.channel.send(new Discord.MessageEmbed()
          .setDescription(`<@${wUser.id}> has been unmuted!`)
          .setColor("#0e2b82")
          .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        }, ms(mutetime))
        break;
      }
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        warnchannel.send(warnEmbed);
        break;
      case 20:
        warnchannel.send(warnEmbed);
        if (warns[wUser.id].warns == 10) {
          let muterole = message.guild.roles.find(`name`, "muted");
          if (!muterole) return message.channel.send(new Discord.MessageEmbed()
          .setDescription("Sorry, please notify server staff to create a role named `muted`!")
          .setColor("#0e2b82")
          .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
          .then(m => m.delete({ timeout: 30000 }));

          let mutetime = "3600s";
          await (wUser.addRole(muterole.id));
          message.channel.send(new Discord.MessageEmbed()
        .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
        .setColor("#0e2b82")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

          setTimeout(function () {
            wUser.removeRole(muterole.id)
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`<@${wUser.id}> has been unmuted!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
          }, ms(mutetime))
          break;
        }
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
          warnchannel.send(warnEmbed);
          break;
        case 30:
          warnchannel.send(warnEmbed);
          if (warns[wUser.id].warns == 10) {
            let muterole = message.guild.roles.find(`name`, "muted");
            if (!muterole) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Sorry, please notify server staff to create a role named `muted`!")
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            .then(m => m.delete({ timeout: 30000 }));

            let mutetime = "3600s";
            await (wUser.addRole(muterole.id));
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

            setTimeout(function () {
              wUser.removeRole(muterole.id)
              message.channel.send(new Discord.MessageEmbed()
              .setDescription(`<@${wUser.id}> has been unmuted!`)
              .setColor("#0e2b82")
              .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
            }, ms(mutetime))
            break;
          }
          case 31:
          case 32:
          case 33:
          case 34:
          case 35:
          case 36:
          case 37:
          case 38:
          case 39:
            warnchannel.send(warnEmbed);
            break;
          case 40:
            warnchannel.send(warnEmbed);
            if (warns[wUser.id].warns == 10) {
              let muterole = message.guild.roles.find(`name`, "muted");
              if (!muterole) return message.channel.send(new Discord.MessageEmbed()
              .setDescription("Sorry, please notify server staff to create a role named `muted`!")
              .setColor("#0e2b82")
              .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
              .then(m => m.delete({ timeout: 30000 }));

              let mutetime = "3600s";
              await (wUser.addRole(muterole.id));
              message.channel.send(new Discord.MessageEmbed()
             .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
             .setColor("#0e2b82")
             .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

              setTimeout(function () {
                wUser.removeRole(muterole.id)
                message.channel.send(new Discord.MessageEmbed()
                .setDescription(`<@${wUser.id}> has been unmuted!`)
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
              }, ms(mutetime))
              break;
            }
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
              warnchannel.send(warnEmbed);
              break;
            case 50:
              warnchannel.send(warnEmbed);
              if (warns[wUser.id].warns == 10) {
                let muterole = message.guild.roles.find(`name`, "muted");
                if (!muterole) return message.channel.send(new Discord.MessageEmbed()
                .setDescription("Sorry, please notify server staff to create a role named `muted`!")
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                .then(m => m.delete({ timeout: 30000 }));

                let mutetime = "3600s";
                await (wUser.addRole(muterole.id));
                message.channel.send(new Discord.MessageEmbed()
                .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
                .setColor("#0e2b82")
                .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

                setTimeout(function () {
                  wUser.removeRole(muterole.id)
                  message.channel.send(new Discord.MessageEmbed()
                  .setDescription(`<@${wUser.id}> has been unmuted!`)
                  .setColor("#0e2b82")
                  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                }, ms(mutetime))
                break;
              }
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
              case 58:
              case 59:
                warnchannel.send(warnEmbed);
                break;
              case 60:
                warnchannel.send(warnEmbed);
                if (warns[wUser.id].warns == 10) {
                  let muterole = message.guild.roles.find(`name`, "muted");
                  if (!muterole) return message.channel.send(new Discord.MessageEmbed()
                  .setDescription("Sorry, please notify server staff to create a role named `muted`!")
                  .setColor("#0e2b82")
                  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                  .then(m => m.delete({ timeout: 30000 }));

                  let mutetime = "3600s";
                  await (wUser.addRole(muterole.id));
                  message.channel.send(new Discord.MessageEmbed()
                  .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
                  .setColor("#0e2b82")
                  .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

                  setTimeout(function () {
                    wUser.removeRole(muterole.id)
                    message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`<@${wUser.id}> has been unmuted!`)
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                  }, ms(mutetime))
                  break;
                }
                case 61:
                case 62:
                case 63:
                case 64:
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                  warnchannel.send(warnEmbed);
                  break;
                case 70:
                  warnchannel.send(warnEmbed);
                  if (warns[wUser.id].warns == 10) {
                    let muterole = message.guild.roles.find(`name`, "muted");
                    if (!muterole) return message.channel.send(new Discord.MessageEmbed()
                    .setDescription("Sorry, please notify server staff to create a role named `muted`!")
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                    .then(m => m.delete({ timeout: 30000 }));
                    
                    let mutetime = "3600s";
                    await (wUser.addRole(muterole.id));
                    message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
                    .setColor("#0e2b82")
                    .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

                    setTimeout(function () {
                      wUser.removeRole(muterole.id)
                      message.channel.send(new Discord.MessageEmbed()
                      .setDescription(`<@${wUser.id}> has been unmuted!`)
                      .setColor("#0e2b82")
                      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                    }, ms(mutetime))
                    break;
                  }
                  case 71:
                  case 72:
                  case 73:
                  case 74:
                  case 75:
                  case 76:
                  case 77:
                  case 78:
                  case 79:
                    warnchannel.send(warnEmbed);
                    break;
                  case 80:
                    warnchannel.send(warnEmbed);
                    if (warns[wUser.id].warns == 10) {
                      let muterole = message.guild.roles.find(`name`, "muted");
                      if (!muterole) return message.channel.send(new Discord.MessageEmbed()
                      .setDescription("Sorry, please notify server staff to create a role named `muted`!")
                      .setColor("#0e2b82")
                      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                      .then(m => m.delete({ timeout: 30000 }));

                      let mutetime = "3600s";
                      await (wUser.addRole(muterole.id));
                      message.channel.send(new Discord.MessageEmbed()
                      .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
                      .setColor("#0e2b82")
                      .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

                      setTimeout(function () {
                        wUser.removeRole(muterole.id)
                        message.channel.send(new Discord.MessageEmbed()
                        .setDescription(`<@${wUser.id}> has been unmuted!`)
                        .setColor("#0e2b82")
                        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                      }, ms(mutetime))
                      break;
                    }
                    case 81:
                    case 82:
                    case 83:
                    case 84:
                    case 85:
                    case 86:
                    case 87:
                    case 88:
                    case 89:
                      warnchannel.send(warnEmbed);
                      break;
                    case 90:
                      warnchannel.send(warnEmbed);
                      if (warns[wUser.id].warns == 10) {
                        let muterole = message.guild.roles.find(`name`, "muted");
                        if (!muterole) return message.channel.send(new Discord.MessageEmbed()
                        .setDescription("Sorry, please notify server staff to create a role named `muted`!")
                        .setColor("#0e2b82")
                        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                        .then(m => m.delete({ timeout: 30000 }));

                        let mutetime = "3600s";
                        await (wUser.addRole(muterole.id));
                        message.channel.send(new Discord.MessageEmbed()
                        .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
                        .setColor("#0e2b82")
                        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

                        setTimeout(function () {
                          wUser.removeRole(muterole.id)
                          message.channel.send(new Discord.MessageEmbed()
                          .setDescription(`<@${wUser.id}> has been unmuted!`)
                          .setColor("#0e2b82")
                          .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                        }, ms(mutetime))
                        break;
                      }
                      case 91:
                      case 92:
                      case 93:
                      case 94:
                      case 95:
                      case 96:
                      case 97:
                      case 98:
                      case 99:
                        warnchannel.send(warnEmbed);
                        break;
                      case 100:
                        warnchannel.send(warnEmbed);
                        if (warns[wUser.id].warns == 10) {
                          let muterole = message.guild.roles.find(`name`, "muted");
                          if (!muterole) return message.channel.send(new Discord.MessageEmbed()
                          .setDescription("Sorry, please notify server staff to create a role named `muted`!")
                          .setColor("#0e2b82")
                          .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                          .then(m => m.delete({ timeout: 30000 }));

                          let mutetime = "3600s";
                          await (wUser.addRole(muterole.id));
                          message.channel.send(new Discord.MessageEmbed()
                          .setDescription(`<@${wUser.id}> has been muted for 1 hour!`)
                          .setColor("#0e2b82")
                          .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))

                          setTimeout(function () {
                            wUser.removeRole(muterole.id)
                            message.channel.send(new Discord.MessageEmbed()
                            .setDescription(`<@${wUser.id}> has been unmuted!`)
                            .setColor("#0e2b82")
                            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
                          }, ms(mutetime))
                          break;
                        }
  }
}
module.exports.help = {
  name: "strike"
}