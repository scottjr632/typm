import { test, expect } from '@oclif/test';

import { getAvailableTypedPackages } from '../../src/helpers/packages';

describe('get available typed packages', () => {
  test
    .nock('https://registry.npmjs.org', api => api
      .get('/@types/react')
      .reply(200)
    )
    .it('returns an array of available typed packages', async () => {
      const typedPackages = await getAvailableTypedPackages(['react', 'notapackage']);
      expect(typedPackages).to.have.lengthOf(1);
      expect(typedPackages[0]).to.equal('@types/react');
    });
});
