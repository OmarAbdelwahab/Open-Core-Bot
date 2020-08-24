const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    console.log("tempute working!");

    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!tomute) return message.reply("Couldn't find user.");

    if(tomute.hasPermission("MANAGE_MESSAGE")) return message.reply("Can't mute them!");
    
    let muterole = message.guild.roles.cache.find((muterole) => muterole.name === "muted");
    
    //start of create role a7a 
    if(!muterole){
        try{
        
            muterole = await message.guild.creatRole({
                name:"muted",
                color: "#000000",
                permisssions:[]
            });
            message.guild.channels.forEach(async (channel, id)=>{
                await channel.overwritePermissions(muterole, {

                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false

                });
            });
        }catch(e){

            console.log(e.stack);
        
        }
    }
    //end of create role a7a

    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!");

    await(tomute.addRole(muterole.id));
    message.reply(`<@{tomute.id} has been muted for ${ms(ms(mutetime))}`);


    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);

}, ms(mutetime));
}
module.exports.help = {

    name: "tempmute"

}
