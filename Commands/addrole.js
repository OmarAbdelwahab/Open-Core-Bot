const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const mentionedUser = message.mentions.users.first(); //|| message.guild.members.cache.get(args[0]);
    
    //console.log(mentionedUser);
    
    const roleName = args[1];
  
    console.log(roleName);

    const {guild} = message;

    const role = guild.roles.cache.find((role) => role.name == roleName);

    //console.log(role);

    if (!role) {
        message.reply(`There is no role with the name ${roleName}`);
        
        return;
    }

    const mentionedUserId = guild.members.cache.get(mentionedUser.id);

    mentionedUserId.roles.add(role);

    message.reply(`that user now has the "${roleName}" role.`);
}

module.exports.help = {
    name: "addrole"
}