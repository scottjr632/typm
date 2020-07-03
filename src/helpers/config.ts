import * as path from 'path';
import { existsSync, readFileSync } from 'fs';

import { Command } from '@oclif/command';

export const packageManager = ['yarn', 'npm'] as const;

export type PossiblePackageManagers = typeof packageManager[number];

export interface Commands {
  manager: string;
  prod: string;
  dev: string;
}

export interface Config {
  packageManager: PossiblePackageManagers;
}

export const localFileName = '.typm.json';
export const globalFileName = 'config.json';

function getCommands(packageManager: PossiblePackageManagers): Commands {
  switch (packageManager) {
    case 'npm':
      return {
        manager: 'npm ',
        prod: 'npm install',
        dev: 'npm install --save-dev',
      };
    default:
      return {
        manager: 'yarn',
        prod: 'yarn add',
        dev: 'yarn add -D',
      };
  }
}

export default abstract class extends Command {
  commands!: Commands;

  private loadFromLocal(): string {
    return readFileSync(localFileName, 'utf-8');
  }

  private loadFromGlobal(): string {
    return readFileSync(path.join(this.config.configDir, globalFileName), 'utf-8');
  }

  async init() {
    let config: string;
    if (existsSync(localFileName)) {
      config = this.loadFromLocal();
    } else if (existsSync(path.join(this.config.configDir, globalFileName))) {
      config = this.loadFromGlobal();
    } else {
      this.error('typm configuration not found. Please run `typm init`');
    }

    this.commands = getCommands(JSON.parse(config.toString()).packageManager);
  }
}
