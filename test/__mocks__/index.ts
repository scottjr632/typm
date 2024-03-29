import { existsSync, renameSync, unlinkSync, writeFileSync } from 'fs';

interface Config {
    packageManager: 'yarn' | 'npm';
}

const name = '.typm.json';
const localBak = `${name}.bak`;

export function removeLocalLockFile() {
    if (existsSync('yarn.lock')) {
        renameSync('yarn.lock', 'yarn.lock.bak');
    }

    if (existsSync('package-lock.json')) {
        renameSync('package-lock.json', 'package-lock.json.bak');
    }
}

export function removeLocalMockedLockFiles() {
    if (existsSync('yarn.lock.bak')) {
        renameSync('yarn.lock.bak', 'yarn.lock');
    }

    if (existsSync('package-lock.json.bak')) {
        renameSync('package-lock.json.bak', 'package-lock.json');
    }
}

export function makeLocalConfigFile(config: Config) {
    if (existsSync(name)) {
        renameSync(name, `${name}.bak`);
    }
    writeFileSync(name, JSON.stringify(config, null, '\t'));
}

export function removeLocalMockedConfigFile() {
    if (existsSync(`${name}.bak`)) {
        unlinkSync(name);
        renameSync(`${name}.bak`, name);
    } else {
        unlinkSync(name);
    }
}

export function makeGlobalConfig(rootDir: string, config: Config) {
    if (existsSync(name))
        renameSync(name, localBak);
    if (existsSync(`${rootDir}/${name}`))
        renameSync(`${rootDir}/${name}`, `${rootDir}/${localBak}`);

    writeFileSync(`${rootDir}/${name}`, JSON.stringify(config, null, '\t'));
}

export function removeGlobalMockConfig(rootDir: string) {
    if (existsSync(localBak)) {
        unlinkSync(name);
        renameSync(localBak, name);
    } else {
        unlinkSync(name);
    }
    if (existsSync(`${rootDir}/${localBak}`)) {
        unlinkSync(`${rootDir}/${name}`);
        renameSync(`${rootDir}/${localBak}`, `${rootDir}/${name}`);
    } else {
        unlinkSync(`${rootDir}/${name}`);
    }
}
