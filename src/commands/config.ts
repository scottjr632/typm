import Config from '../helpers/config';

export default class ConfigCommand extends Config {
    static description = 'show preferred package manager'

    async run() {
        this.log(`Package manager set to -> ${this.commands.manager}`);
        this.log('\r\nTo change preferred package manager run `typm config`');
    }
}
