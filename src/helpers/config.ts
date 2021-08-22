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

export const localFiles: Map<string, PossiblePackageManagers> = new Map([
  ['yarn.lock', 'yarn'],
  ['package-lock.json', 'npm'],
]);

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

function isPossiblePackageManager(arg: any): arg is PossiblePackageManagers {
  return arg && (arg === 'yarn' || arg === 'npm');
}

export default abstract class extends Command {
  commands!: Commands;

  private checkForLocalFile(): PossiblePackageManagers | null {
    for (const possible of localFiles) {
      if (existsSync(possible[0]))
        return possible[1];
    }
    return null;
  }

  private checkForConfig(): PossiblePackageManagers | null {
    const { configDir } = this.config;
    for (const possiblePath in [localFileName, path.join(configDir, globalFileName)]) {
      if (existsSync(possiblePath)) {
        const { packageManager } = JSON.parse(readFileSync(possiblePath).toString());
        if (!isPossiblePackageManager(packageManager))
          return null;

        return packageManager;
      }
    }
    return null;
  }

  private getPackageManager(): PossiblePackageManagers | null {
    for (const potentialPackageManager of [this.checkForLocalFile(), this.checkForConfig()]) {
      if (potentialPackageManager) {
        return potentialPackageManager;
      }
    }
    return null;
  }

  async init() {
    const packageManager = this.getPackageManager();
    if (!packageManager) {
      this.error(`Invalid package manager found ${packageManager}`);
    }

    this.commands = getCommands(packageManager);
  }
}
