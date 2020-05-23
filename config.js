const fs = require('fs');
const chalk = require('chalk');
const execSync = require('child_process').execSync;

const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const CONFIG_FILE_NAME = '.typm.json'

const potentialPkgManagers = [
  'npm',
  'yarn',
];

function getCommands(packageManager) {
  switch (packageManager) {
    case 'yarn':
      return {
        manager: 'yarn',
        prod: 'yarn add',
        dev: 'yarn add -D'
      }
    case 'npm':
     return {
       manager: 'npm',
       prod: 'npm install',
       dev: 'npm install --save-dev'
     } 
    default:
      return {
        manager: 'yarn',
        prod: 'npm install',
        dev: 'npm install --save-dev'
      }
  }
}

exports.initialize = async () => {
  return new Promise((resolve, reject) => {
    const re = /^(yarn|npm)$/
    rl.question(`Specify which package manager to use (${potentialPkgManagers.join('|')}) [${potentialPkgManagers[0]}]: `, packageManager => {
      if (packageManager === '') {
        packageManager = potentialPkgManagers[0]
      } else if (!re.test(packageManager)) {
        console.error(`${chalk.red('Error:')} package manager must be ${potentialPkgManagers.join(' or ')}`);
        process.exit(1);
      }
  
      fs.writeFileSync(CONFIG_FILE_NAME, JSON.stringify({ packageManager }, null, '\t'));
      fs.appendFileSync('.gitignore', `\n${CONFIG_FILE_NAME}\n`)
      console.info(`${chalk.green('Success:')} configuration file has been saved for typm\n\n`);
  
      execSync(`${packageManager} init`, { stdio: 'inherit' });
      resolve()
      // process.exit(0);
    })
  })
}

exports.loadConfig = () => {
  if (!fs.existsSync(CONFIG_FILE_NAME)) {
    console.info(chalk.red('Error: '), 'typm configuration file not found. Please run `typm init`');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE_NAME, 'utf8'));
  return getCommands(config.packageManager)
}