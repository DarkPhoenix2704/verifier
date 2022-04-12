require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client({ intents:[Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.DIRECT_MESSAGES] });

const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else if (client.on) {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.login(process.env.token);
