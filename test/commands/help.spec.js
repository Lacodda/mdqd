const exec = require('../../lib/util/exec');
// const help = require('../../lib/help');

describe('test help functions', () => {
  describe('cli', () => {
    it('prints a general help message', async () => {
      const result = await exec(`${bin}`);

      assert.ok(/Usage: mqd/.test(result));
      assert.ok(/help/.test(result));
      assert.ok(/init/.test(result));
    });
  });
});
