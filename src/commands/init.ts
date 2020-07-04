import { writeFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

import { Command, flags } from '@oclif/command';
import { prompt } from 'inquirer';

import { packageManager, globalFileName, localFileName } from '../helpers/config';

export default class Initialize extends Command {
  static description = 'initialize typm with your package manager'

  static aliases = ['initialize']

  static flags = {
    help: flags.help({ char: 'h' }),
    global: flags.boolean({ char: 'g' }),
  }

  async run() {
    let toWrite: string;
    const { flags } = this.parse(Initialize);
    const responses = await prompt([{
      name: 'manager',
      message: 'select package manager',
      type: 'list',
      choices: packageManager.map(manager => ({ name: manager })),
    }]);

    if (flags.global) {
      if (!existsSync(this.config.configDir))
        mkdirSync(this.config.configDir);
      toWrite = path.join(this.config.configDir, globalFileName);
    } else {
      toWrite = localFileName;
    }

    writeFileSync(toWrite, JSON.stringify({ packageManager: responses.manager }, null, '\t'));
    this.log(`configuration file has been saved for typm to ${toWrite}`);
    this.log(`typm will use ${responses.manager} as the package manager`);
  }
}
