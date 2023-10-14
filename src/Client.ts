import fs from 'fs';
import path = require('path');
import lib from 'discord.js';
import SlashCommand from './SlashCommand';
import Command from './Command';
class Client extends lib.Client {

    public commands: lib.Collection<unknown, any>;
    public messageCommands: lib.Collection<string, Command>;
    constructor(options: lib.ClientOptions) {
        super(options);
        this.messageCommands = new lib.Collection();
        this.commands = new lib.Collection();
    }

    public async sendMessageInChannel(channelId: string, message: string) {
        await (this.channels.cache.get(channelId) as lib.TextChannel).send(message);
    }


    private addSlashCommand(cmd: SlashCommand) {
        this.commands.set(cmd.data.name, cmd);
    }

    private addCommand(cmd: Command) {
        this.messageCommands.set(cmd.name, cmd);
    }

    public commandHandler(): void {
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if (command instanceof Command) {
                this.addCommand(command);
            } else {
                continue;
            }
        }
    }

    public slashCommandHandler(): void {
        const commandsPath = path.join(__dirname, 'slashcommands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if (command instanceof SlashCommand) {
                this.addSlashCommand(command);
            } else {
                continue;
            }
        }
    }

    public eventHandler(): void {
        this.once(lib.Events.ClientReady, c => {
            console.log(`Ready! Logged in as ${c.user.tag}`);

            const eventsPath = path.join(__dirname, 'events');
            const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

            for (const file of eventFiles) {
                const filePath = path.join(eventsPath, file);
                const event = require(filePath);
                if (event.once) {
                    this.once(event.name, (...args) => event.execute(this, ...args));
                } else {
                    this.on(event.name, (...args) => event.execute(this, ...args));
                }
            }
        });
    }
};



export default Client;