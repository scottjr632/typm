#!/usr/bin/env node

const execSync = require('child_process').execSync;

const chalk = require('chalk');

const { loadConfig, initialize } = require('./config');
const installTypedPackages = require('./installTypedPackages');

const args = process.argv.slice((2))
const welcomeMessage = chalk.white.bold('Thanks for using typm!\n')
console.info(welcomeMessage)

const installCmds = [
  'i', 'install', 'add'
]

if (args[0] === 'init' || args[0] === 'initialize') {
  initialize();
} else if (!installCmds.includes(args[0])) {
  const config = loadConfig();
  execSync(`${config.manager} ${args.join(' ')}`, { stdio: 'inherit' });
  process.exit(0);
} else {
  const config = loadConfig();
  const packages = args.slice(1);
  execSync(`${config.prod} ${packages.join(' ')}`, { stdio: 'inherit' });
  
  installTypedPackages(config, packages);
}
