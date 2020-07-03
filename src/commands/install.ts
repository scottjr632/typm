import { flags } from '@oclif/command';

import Config from '../helpers/config';

import { getAvailableTypedPackages, installPackages } from '../helpers/packages';

export default class Hello extends Config {
  static description = 'install npm package[s]'

  static strict = false

  static aliases = ['i', 'add']

  static examples = [
    '$ typm add react react-dom',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run() {
    const { argv } = this.parse(Hello);
    const typedPackages = getAvailableTypedPackages(argv);

    installPackages(this.commands.prod, argv);

    this.log(`\nInstalling ${(await typedPackages).join(' ')}`);
    installPackages(this.commands.dev, typedPackages);
  }
}
