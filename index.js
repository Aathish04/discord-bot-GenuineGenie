const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const clientId = process.env["CLIENTID"]
const guildId = process.env["DEV_GUILD_ID"]
const token = process.env["TOKEN"]

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const categoryFolders = fs.readdirSync("./commands").filter(file => file.endsWith('_commands'))
for (const category of categoryFolders){
  const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
	  const command = require(`./commands/${category}/${file}`);
	  client.commands.set(command.data.name, command);
} }

client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);