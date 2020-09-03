const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    console.log("tempute working!");

    let tomute = message.mentions.members.first();

    if (!tomute) return message.reply("Couldn't find user.");

    if (tomute.hasPermission("MANAGE_MESSAGE")) return message.reply("Can't mute them!");

    let muterole = message.guild.roles.cache.find((muterole) => muterole.name == "muted");

    //start of create role 
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    //end of create role 

    let mutetime = args[1];

    if (!mutetime) return message.reply("You didn't specify a time!");

    // mute and unmute function - refactored - not tested
    await (tomute.roles.add(muterole.id));

    message.reply(`<@{tomute.id} has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function () {
        tomute.roles.remove(muterole.id);

        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
}

module.exports.help = {
    name: "tempmute"
}