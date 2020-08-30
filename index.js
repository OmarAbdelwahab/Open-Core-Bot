const Discord = require("discord.js"); // discord library
const {config} = require("dotenv"); // spaghetti code
const bot = new Discord.Client({disableEveryone: true}); //initialize the bot 
const fs = require("fs"); //spaghetti code
bot.commands =  new Discord.Collection; // spaghetti code 

config({
    path: __dirname + "/.env", //spaghetti code
});

//console messages to indicate which files are loaded
fs.readdir("./commands/",(err, files)=>{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
   
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);

        console.log(`${f} loaded!`);

        bot.commands.set(props.help.name, props);
    });
});

//Event Listeners

// when the bot is started, display several stats in console
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    // set bot status to a certain message
    bot.user.setActivity("Developing Open Core Bot");
    // the number of servers using this bot
    console.log(`Open Core Bot Server Count: ${bot.guilds.cache.size}`);
});

// when a command is issued in a message for the bot then respond
bot.on("message", async (message) => {
    let defaultPrefix = "!"; //command prefix

    /*if the message author is the bot itself, or the message is a dm, 
      or the message doesn't start with a prefix then don't do shit*/
    if (message.author.bot) return;
   
    if (message.channel.type === "dm") return;
   
    if (!message.content.startsWith(prefix)) return;

    // split the message content
    let messageArray = message.content.split(" ");
   
    let cmd = messageArray[0];
   
    let args = messageArray.slice(1);

    //command handler
    let commandfile = bot.commands.get(cmd.slice(defaultPrefix.length));

    if(commandfile) commandfile.run(bot, message, args);

    //custom prefix command
    if(!prefix[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: defaultPrefix
        };
    }
    
    let prefix = prefix[message.guild.id].prefixes;
});

// welcome message when a new member joins
bot.on("guildMemberAdd", async member => {
    const targetChannelId = '748702149055086652';

    console.log(`${member.id} joined the server.`);

    let welcomeChannel = member.guild.channels.cache.find(welcomechannel => welcomeChannel.name == "welcome_leave");
    
    const welcomeMessage = `welcome <@${member.id}> to the server! please check out 
    ${member.guild.channels.cache
    .get(targetChannelId)
    .toString()} for the Rules.`

    welcomeChannel.send(welcomeMessage);
});

//a channel message to indicate when a user leaves the the server
bot.on("guildMemberRemove", async member =>{
    console.log(`${member.id} left the server.`);

    let welcomeChannel = member.guild.channels.cache.find(welcomeChannel => welcomeChannel.name == "welcome_leave");

    welcome.send(`${member} has bailed on the server!`);    
});

//a channel message to indicate a channel creation 
bot.on("channelCreate", async channel => {
    console.log(`${channel.name} has been created.`);

    let generalChannel = channel.guild.channels.cache.find(generalChannel => generalChannel.name == "general");

    generalChannel.send(`The channel <#${channel.id}> has been created.`);
})

//a channel message to indicate a channel deletion
bot.on("channelDelete", async channel=>{
    console.log(`${channel.name} has been deleted.`);

    let generalChannel = channel.guild.channels.cache.find(generalChannel => generalChannel.name == "general");

    generalChannel.send(`The channel "#${channel.name}" has been deleted.`);
});

// login with the dicord bot token
bot.login(process.env.TOKEN);