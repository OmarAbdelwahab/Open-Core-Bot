const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //console.log("kicking works");

    let kUser = message.mentions.members.first();
    
    if (!kUser) return message.channel.send("Can't find user!");

    let kReason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not an Admin.");
   
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked.");

    let kickembed = new Discord.MessageEmbed()
        .setDescription("~kick~")
        .setColor("#15f153")
        .addField("Kicked User", `${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

    const kickChannel = message.guild.channel.cache.find(kickchannel => kickchannel.name === "incidents");

    if (!kickchannel) return message.channel.send("can't find incidents channel.");

    message.guild.member.kick(kReason);

    kickchannel.send(kickembed);
}

module.exports.help = {
    name: "kick"
}