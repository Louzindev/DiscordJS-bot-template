import lib from 'discord.js'
import SlashCommand from '../SlashCommand'
import Client from '../Client';

async function pingFunction(client: Client, interaction: lib.ChatInputCommandInteraction) {
    await interaction.reply("PONG!!!");
}

const data = new lib.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies PONG!!!");

const ping: SlashCommand = new SlashCommand({
    data: data,
    func: pingFunction
});

module.exports = ping;