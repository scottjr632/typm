import { execSync } from 'child_process';

import axios from 'axios';

/*
  Returns the available typed packages for download
*/
export async function getAvailableTypedPackages(packages: string[]): Promise<string[]> {
  const possibleTypedPackages = packages.map(pkg => `@types/${pkg}`);

  const typedPackages = await Promise.all(possibleTypedPackages.map(async pkg => {
    try {
      const res = await axios.get(`https://registry.npmjs.org/${pkg}`);
      if (res.status === 200)
        return pkg;
    } catch (error) {
      return null;
    }
  }));

  return typedPackages.filter(Boolean) as string[];
}

export async function installPackages(cmd: string, packages: Promise<string[]> | string[]) {
  const packagesToInstall = await packages;
  if (packagesToInstall.length > 0) {
    execSync(`${cmd} ${packagesToInstall.join(' ')}`, { stdio: 'inherit' });
  }
}
