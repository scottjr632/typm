const axios = require('axios');
const execSync = require('child_process').execSync;

async function installTypedPackages(config, packages) {
  const possibleTypes = packages.map(package => `@types/${package}`)
  console.info(`Attempting to install type packages ${possibleTypes.join(' ')} 🚀`)

  const typedPackages = await Promise.all(possibleTypes.map(async package => {
    try {
      const res = await axios.get(`https://registry.npmjs.org/${package}`)
      if (res.status === 200) {
        return package;
      }
    } catch (error) {
      return null;
    }
  }))

  execSync(`${config.dev} ${typedPackages.filter(Boolean).join(' ')}`, { stdio: 'inherit' })
  process.exit(0);
}

module.exports = installTypedPackages