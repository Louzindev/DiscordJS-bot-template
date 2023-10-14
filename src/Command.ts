import Client from "./Client";
import lib from 'discord.js'

interface ICommand {
    name: string;
    execute: (client: Client, message: lib.Message, args: any) => void;
}

class Command {
    private commandObject: ICommand;
    constructor(object: ICommand) {
        this.commandObject = object;
    }

    public get name(): string { return this.commandObject.name; }
    public async execute(client: Client, message: lib.Message, args: any) {
        this.commandObject.execute(client, message, args);
    }
}

export default Command;