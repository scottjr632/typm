const axios = require('axios');
const execSync = require('child_process').execSync;

async function getAvailableTypedPackages(packages) {
  const possibleTypedPackages = packages.map(package => `@types/${package}`)

  const typedPackages = await Promise.all(possibleTypedPackages.map(async package => {
    try {
      const res = await axios.get(`https://registry.npmjs.org/${package}`);
      if (res.status === 200)
        return package;
    } catch (error) {
      return null;
    }
  }))
  return typedPackages.filter(Boolean)
}

async function installTypedPackages(config, packages) {
  let filteredTypePackages = await packages
  console.info(`Attempting to install type packages ${filteredTypePackages.join(' ')} 🚀`)
  if (filteredTypePackages.length > 0) {
    execSync(`${config.dev} ${filteredTypePackages.join(' ')}`, { stdio: 'inherit' })
  } else {
    console.info('No type packages found!')
  }
}

module.exports = {
  installTypedPackages,
  getAvailableTypedPackages
}
