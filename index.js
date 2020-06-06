#!/usr/bin/env node

const execSync = require('child_process').execSync;

const chalk = require('chalk');

var package = require('./package.json');
const { loadConfig, initialize } = require('./config');
const { installTypedPackages, getAvailableTypedPackages } = require('./installTypedPackages');

const args = process.argv.slice((2))
const welcomeMessage = chalk.white.bold('Thanks for using typm!\n')
console.info(welcomeMessage)

const installCmds = [
  'i', 'install', 'add'
]

const versionCmds = [
  '-v', '--version'
]

const helpCmds = [
  '-h', '--help'
]

const flagRegex = /( -[^\s]+)/gm

function findAllFlags(input) {
  const matches = [...` ${input}`.matchAll(flagRegex)]
  return matches.map(match => match[1].replace(' ', ''))
}

function replaceAllFlags(input) {
  return ` ${input}`.replace(flagRegex, '')
}

async function bootstrap() {
  if (args[0] === 'init' || args[0] === 'initialize') {
    await initialize();
  } else if (versionCmds.includes(args[0])) {
    const config = loadConfig();

    console.info(`TYPM version: ${package.version}`)

    const managerVersion = execSync(`${config.manager} ${args.join(' ')}`)
    console.info(`${config.manager.toUpperCase()} version: ${managerVersion}`)
  } else if (helpCmds.includes(args[0])) {
    console.info(`usage: ${package.name} ${installCmds.join('|')} [package name(s)]`)
    console.info(`example: typm add react react-router-dom typescript`)
  } else if (!installCmds.includes(args[0])) {
    const config = loadConfig();

    execSync(`${config.manager} ${args.join(' ')}`, { stdio: 'inherit' });
  } else {
    const config = loadConfig();
    const cmds = args.slice(1).join(' ');
    const flags = findAllFlags(cmds);
    const packages = replaceAllFlags(cmds);

    const typedPackages = getAvailableTypedPackages(packages.split(' ').filter(package => package.length > 0))
    execSync(`${config.prod} ${flags.join(' ')} ${packages}`, { stdio: 'inherit' });

    await installTypedPackages(config, typedPackages);
  }
  process.exit(0)
}

bootstrap()