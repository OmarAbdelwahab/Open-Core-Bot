const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const mentionedUser = message.mentions.users.first();

    const roleName = args[1];

    const {guild} = message;

    const role = guild.roles.cache.find((role) => { role.name == roleName; });

    if (!role) {
        message.reply(`There is no role with the name ${roleName}`);
        
        return;
    }

    const member = guild.members.cache.get(mentionedUser.id);

    member.roles.add(role);

    message.reply(`that user now has the "${roleName}" role.`);
}

module.exports.help = {
    name: "addrole"
}