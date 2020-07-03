
import { expect, test } from '@oclif/test';
import { makeLocalConfigFile, removeLocalMockedConfigFile } from '../__mocks__';

describe('config', () => {
  test
    .stdout({ print: true })
    .do(() => {
      makeLocalConfigFile({ packageManager: 'yarn' });
    })
    .command(['config'])
    .do(() => {
      removeLocalMockedConfigFile();
    })
    .it('displays the current package manager for yarn', ctx => {
      expect(ctx.stdout).to.contain('yarn');
    });

  test
    .stdout({ print: true })
    .do(() => {
      console.log('one');
      makeLocalConfigFile({ packageManager: 'npm' });
    })
    .command(['config'])
    .do(() => {
      console.log('two');
      removeLocalMockedConfigFile();
    })
    .it('displays the current package manager for npm', ctx => {
      expect(ctx.stdout).to.contain('npm');
    });
});

