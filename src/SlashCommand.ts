import lib from 'discord.js'
import Client from './Client';

interface ISlashCommand {
    data: lib.SlashCommandBuilder;
    func: (client: Client, interaction: lib.ChatInputCommandInteraction) => void;
}

class SlashCommand {
    private _data: ISlashCommand;
    constructor(data: ISlashCommand) {
        this._data = data;
    };

    public async execute(client: Client, interaction: lib.ChatInputCommandInteraction) {
        this._data.func(client, interaction);
    }

    public get data(): lib.SlashCommandBuilder {
        return this._data.data;
    }
}

export default SlashCommand;