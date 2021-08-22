
import { expect, test } from '@oclif/test';
import { writeFileSync } from 'fs';
import { makeLocalConfigFile, removeLocalLockFile, removeLocalMockedConfigFile, removeLocalMockedLockFiles } from '../__mocks__';

describe('The config', () => {
  test
    .stdout({ print: true })
    .do(() => {
      removeLocalLockFile();
      makeLocalConfigFile({ packageManager: 'yarn' });
    })
    .command(['config'])
    .do(() => {
      removeLocalMockedLockFiles();
      removeLocalMockedConfigFile();
    })
    .it('displays the current package manager for yarn from local config', ctx => {
      expect(ctx.stdout).to.contain('yarn');
    });

  test
    .stdout({ print: true })
    .do(() => {
      removeLocalLockFile();
      makeLocalConfigFile({ packageManager: 'npm' });
    })
    .command(['config'])
    .do(() => {
      removeLocalMockedLockFiles();
      removeLocalMockedConfigFile();
    })
    .it('displays the current package manager for npm from local config instead of lock', ctx => {
      expect(ctx.stdout).to.contain('npm');
    });

  test
    .stdout({ print: true })
    .do(() => {
      removeLocalLockFile();
      writeFileSync('yarn.lock', '');
    })
    .command(['config'])
    .do(() => {
      removeLocalMockedLockFiles();
    })
    .it('displays the current package manager for yarn from local lock file', ctx => {
      expect(ctx.stdout).to.contain('yarn');
    });

  test
    .stdout({ print: true })
    .do(() => {
      removeLocalLockFile();
      writeFileSync('package-lock.json', '');
    })
    .command(['config'])
    .do(() => {
      removeLocalMockedLockFiles();
    })
    .it('displays the current package manager for npm from local lock file', ctx => {
      expect(ctx.stdout).to.contain('npm');
    });
});

