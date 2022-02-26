const {Client, Intents, Message} = require("discord.js");
const { token } = require('./config.json');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});

client.on("ready", () => {
    console.log("Bot is online!");
})

client.on("messageCreate", (message) => {
    const prefix = "!";
    if (!message.content.startsWith(prefix)) {
        return;
    }
    
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if (message.content.toLowerCase() === `${prefix}test`) {
        message.channel.send("Your test has worked!");
    }

    if (cmd.toLowerCase() === `${prefix}kick`) {
        if (!args[0]) {
            return message.reply("Command missing target.");
        }
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(i => i.user.username.toLowerCase() === args.slice(0).join(" ") || i.user.username === args[0]);
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.reply("User permissions required.");
        }
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
            return message.reply("Bot permissions required.");
        }
        if (message.member.id === member.id) {
            return message.reply("You can't kick yourself.");
        }

        member.kick();
        
        message.channel.send(`${member} has been kicked from the server.`);
 }

    if (cmd.toLowerCase() === `${prefix}ban`) {
    if (!args[0]) {
        return message.reply("Command missing target.");
    }
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(i => i.user.username.toLowerCase() === args.slice(0).join(" ") || i.user.username === args[0]);
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.reply("User permissions missing.");
        }
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            return message.reply("Bot permissions missing.");
        }
        if (message.member.id === member.id) {
            return message.reply("You can't ban yourself.");
        }
        let reason = args.slice(1).join(" ") || "No reason"

        member.ban({ reason:reason });

        message.channel.send(`${member} has been banned from the server.\nReason: ${reason}`);
    }


})

client.login(token);
