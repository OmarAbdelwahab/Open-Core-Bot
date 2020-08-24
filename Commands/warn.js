const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have the permission to warn users");

    let wUser = message.mentions.members.first();

    if (!wUser) return message.reply("Could not find user.");

    if (wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This user is a moderater or has a high role.");

    let reason = args.join(" ").slice(22);

    if (!warns[wUser.id]) warns[wUser.id] = {

        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

        if (err) console.log(err);

    });

    let warnEmbed = new Discord.MessageEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.username)
        .setColor("#fc6400")
        .addField("Warned User", wUser.tag)
        .addField("Number of Warnings", warns[wUser.id].warns)
        .addField("Reason", reason);

    let warnchannel = message.guild.channels.cache.find(warnchannel => warnchannel.name == "incidents");
  
    if (!warnchannel) return message.reply("Couldn't find channel");

    warnchannel.send(warnEmbed);

    if (warns[wUser.id].warns == 2) {

        let muterole = message.guild.roles.cache.find(muterole => muterole.name == "muted");
       
        if (!muterole) return message.reply("Role not found");

        let mutetime = "10s";
       
        await (wUser.addRole(muterole.id));
       
        message.channel.send(`${wUser.id} has been temprorily muted`);

        setTimeout(function () {
       
            wUserId.role.remove(muterole.id);
       
        });
    }

    if (warns[wUser.id].warns == 3) {

        message.guild.member(wUser).ban(reason);
        
        message.channel.send(`${wUser} has been banned.`);
    }

}

module.exports.help = {

    name: "warn"
}