import Client from "./Client";
import lib from 'discord.js'
import config from "./clientcfg.json";

const client: Client = new Client({
    intents: [lib.GatewayIntentBits.Guilds,
    lib.GatewayIntentBits.GuildMembers,
    lib.GatewayIntentBits.GuildMessages,
    lib.GatewayIntentBits.DirectMessages,
    lib.GatewayIntentBits.MessageContent
    ]
});

client.slashCommandHandler();
client.commandHandler();
client.eventHandler();

client.login(config.clientToken);