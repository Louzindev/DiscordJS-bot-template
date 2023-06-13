import lib from 'discord.js'
export = {
    data: new lib.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Reply pong!"),
    async execute(interaction : any)
    {
        await interaction.reply("pong!");
    }
}