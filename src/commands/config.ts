import Config from '../helpers/config';

export default class ConfigCommand extends Config {
    async run() {
        this.log(`package manager set to -> ${this.commands.manager}`);
    }
}
