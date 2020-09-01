const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have the required Permissions");
    if(!args[0] || args[0 == "help"]) return message.reply("Usage: !prefix <desired prefix here>");

    let prefixes = JSON.parse(fs.reaadFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err);
    });

    let

}

module.exports.help = {
name:"prefix"
}