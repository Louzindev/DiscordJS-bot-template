import lib from 'discord.js'
import { prefix } from '../clientcfg.json'
import Client from '../Client';

export = {
    name: lib.Events.MessageCreate,
    async execute(client: Client, message: lib.Message) {
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        if (command == undefined) return;
        const cmd = client.messageCommands.get(command.toLowerCase());

        if (!cmd) return;

        await cmd.execute(client, message, args);
    }
};