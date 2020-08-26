const Discord = require ("discord.js");

module.exports.run = async(bot, message, args) => {   
    //console.log("botinfo working");

    let bicon = bot.user.displayAvatarURL();

    let botembed = new Discord.MessageEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
}

module.exports.help = {
    name : "botinfo"
}