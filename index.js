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

const flagRegex = /( -[^\s]+)/gm

function findAllFlags(input) {
  const matches = [...` ${input}`.matchAll(flagRegex)]
  return matches.map(match => match[1].replace(' ', ''))
}

function replaceAllFlags(input) {
  return ` ${input}`.replace(flagRegex, '')
}

if (args[0] === 'init' || args[0] === 'initialize') {
  initialize();
} else if (!installCmds.includes(args[0])) {
  const config = loadConfig();
  execSync(`${config.manager} ${args.join(' ')}`, { stdio: 'inherit' });
  process.exit(0);
} else {
  const config = loadConfig();
  const cmds = args.slice(1).join(' ');
  const flags = findAllFlags(cmds);
  const packages = replaceAllFlags(cmds);

  execSync(`${config.prod} ${flags.join(' ')} ${packages}`, { stdio: 'inherit' });
  
  installTypedPackages(config, packages.split(' ').filter(package => package.length > 0));
}
