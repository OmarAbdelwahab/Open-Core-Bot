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


// when the bot is started, display several stats in console
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    // set bot status to a certain message
    bot.user.setActivity("Developing Open Core Bot");
    // the number of servers usin this bot
    console.log(`Open Core Bot Server Count: ${bot.guilds.cache.size}`);
});

// when a command is issued in a message for the bot then respond
bot.on("message", async (message) => {
    const prefix = "!"; //command prefix

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
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile) commandfile.run(bot, message, args);
   
});

// login with the dicord bot token
bot.login(process.env.TOKEN);