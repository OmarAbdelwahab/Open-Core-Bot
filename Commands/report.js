const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    console.log("reporting works");

    let rUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    
    if (!rUser) return message.channel.send("Couldn't find user.");

    let reason = args.join(" ").slice(22);

    const reportchannel = message.guild.channels.cache.find((reportchannel) => reportchannel.name === "reports");

    if (!reportchannel) return message.channel.send("Couldn't find reports channel.");

    let reportEmbed = new Discord.MessageEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

    return reportchannel.send(reportEmbed);

}

module.exports.help = {

    name: "report"
    
}