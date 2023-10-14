import lib from 'discord.js'
import Client from '../Client'

export = {
    name: lib.Events.InteractionCreate,
    async execute(client: Client, interaction: lib.Interaction) {
        if (!interaction.isChatInputCommand() && !interaction.isStringSelectMenu()) return;

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(client, interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
        else if (interaction.isStringSelectMenu()) {

        }
    }
};