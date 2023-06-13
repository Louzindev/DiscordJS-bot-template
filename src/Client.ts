import fs from 'fs';
import path = require('path');
import lib from 'discord.js';

class Client extends lib.Client{

    public commands: lib.Collection<unknown, any>;
    constructor(options : lib.ClientOptions) {
        super(options);
        this.commands = new lib.Collection();
    }

    public async sendMessageInChannel(channelId: string, message: string) {
        await (this.channels.cache.get(channelId) as lib.TextChannel).send(message);
    }

    public commandHandler() : void {
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
                console.log("Succefully add new command");
            } else {
                console.log(`[AVISO] O comando em  ${filePath} nao tem  "data" ou "execute".`);
            }
        }
    }
};

const client : Client = new Client({ intents: [lib.GatewayIntentBits.Guilds, 
    lib.GatewayIntentBits.GuildMembers, 
    lib.GatewayIntentBits.GuildMessages, 
    lib.GatewayIntentBits.DirectMessages,
    lib.GatewayIntentBits.MessageContent
]});

client.once(lib.Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
    
    client.commandHandler();
    
});

export default client;