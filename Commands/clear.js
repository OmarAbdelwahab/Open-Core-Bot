const Discord = require("discord.js");

// clear messages that are less than 14 days old 
module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSSAGES")) return message.reply("You don't have the required permissions");

    if (!args[0]) return message.channel.send("Please enter the number messages to delete");

    message.channel.bulkDelete(args[0]).then(() => {

        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete({
            timeout: 5000
        }));
    });
}

module.exports.help = {
    name: "clear"
}