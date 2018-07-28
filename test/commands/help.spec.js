const exec = require('../../lib/util/exec');

describe('test help functions', () => {
  describe('cli', () => {
    it('prints a general help message', async () => {
      const result = await exec(`${bin} help`);

      assert.ok(/mqd convert/.test(result));
      assert.ok(/mqd init/.test(result));
    });
  });
});
