import Command from '../Command';
import Client from '../Client';
import lib from 'discord.js'

async function pingFunction(client: Client, message: lib.Message, args: any) {
    message.reply("PONG!");
}

const ping: Command = new Command({
    "name": "ping",
    "execute": pingFunction
});

module.exports = ping;