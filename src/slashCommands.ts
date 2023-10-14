import { REST, Routes } from 'discord.js';
import bcfg from './clientcfg.json'
import fs from 'fs';
import SlashCommand from './SlashCommand';

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./dist/slashcommands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./slashcommands/${file}`);
	if (command instanceof SlashCommand) {
		commands.push(command.data.toJSON());
		console.log('command added: %s', command.data.name);
	}
}

// Construct and prepare an instance of the REST module 
const rest: REST = new REST({ version: '10' }).setToken(bcfg.clientToken);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationCommands(bcfg.clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();