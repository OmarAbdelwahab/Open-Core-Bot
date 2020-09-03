const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have the required permissions or moderater role.");

    let wUser = message.mentions.users.first();

    if (!wUser) return message.reply("User not found.");

    if (!warns[wUser.id]) return message.reply("User has no warnings");

    else {
        let warnlevel = warns[wUser.id].warns;

        message.reply(`<@${wUser.id}> has ${warnlevel} warnings`);
    }
}

module.exports.help = {
    name: "warnlevel"
}