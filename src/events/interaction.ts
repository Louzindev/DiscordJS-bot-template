import lib from 'discord.js'

export = {
	name: lib.Events.InteractionCreate,
	async execute(interaction: any) {
		if (!interaction.isChatInputCommand() && !interaction.isStringSelectMenu()) return;

        if (interaction.isChatInputCommand())
        {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
        else if (interaction.isStringSelectMenu())
        {   
            
        }       
	}
};