const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the required permission.");

    let botmessage = args.join(" ");

    message.delete().catch();

    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}