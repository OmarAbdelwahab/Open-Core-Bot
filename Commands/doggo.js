const Discord = require("discord.js");
const superagent = require("superagent");

//SuperAgent doggo demo
module.exports.run = async (bot, message, args) => {

    let {
        body
    } = await superagent.get(`https://random.dog/woof.json`);

    let dogembed = new Discord.MessageEmbed()
        .setColor("#ff9900")
        .setTitle("Doggo")
        .setImage(body.url);

    message.channel.send(dogembed);
}

module.exports.help = {
    name: "doggo"
}