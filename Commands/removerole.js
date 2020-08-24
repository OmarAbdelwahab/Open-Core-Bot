const Discord = require ("discord.js");

module.exports.run = async(bot, message, args )=> {

    
    const mentionedUser = message.mentions.users.first();

    const roleName = args[1];

    const { guild } = message;

    const role = guild.roles.cache.find((role) =>{
  
        return role.name === roleName;
    });

    if(!role) {
        message.reply(`There is no role with the name ${roleName}`);
        return
    }

    const member = guild.members.cache.get(mentionedUser.id);

    if(member.roles.cache.get(role.id)){

        member.roles.remove(role)
        
        message.reply(`That user no longer has the ${roleName} role.`);
    
    }
    else{

        message.reply(`That user does not have the ${roleName} role.`);

    }

}

module.exports.help = {

    name:"removerole"

}