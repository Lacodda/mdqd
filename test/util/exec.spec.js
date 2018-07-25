const exec = require('../../lib/util/exec');

describe('test exec function', () => {
  it('exec worked', async () => {
    try {
      const result = await exec(`${bin} --version`);
      expect(result).to.equal(`${pkg.version}\n`);
    } catch (error) {
      assert.isNotOk('exec', 'this will fail');
    }
  });

  it('catch error in exec', async () => {
    try {
      await exec(`${bin} --not-a-param`);
      assert.isNotOk('convert', `error wasn't caught`);
    } catch (error) {
      assert.isOk('exec', 'error was caught');
    }
  });
});
