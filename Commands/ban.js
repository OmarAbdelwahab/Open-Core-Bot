const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) => {

    let bUser = message.mentions.members.first();
   
    if (!bUser) return message.channel.send("user is not found");

    let bReason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You are not an admin.");
   
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned.");

    let banembed = new Discord.MessageEmbed
        .setDescription("~Ban~")
        .setColor("#15f153")
        .addField("Banned User", `${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

    const banChannel = message.guild.channel.cache.find(banChannel => banChannel === "bans");

    if (!banChannel) return message.channel.send("can't find bans channels");

    message.guild.member(bUser).ban(bReason);

    banchannel.send(banembed);
}

module.exports.help = {
    name: "ban"
}