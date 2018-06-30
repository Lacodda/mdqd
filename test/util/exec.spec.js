const exec = require('../../lib/util/exec');

describe('test exec function', () => {
  it('exec worked', async () => {
    try {
      const result = await exec(`${mqd} --version`);
      expect(result).to.equal(`${pkg.version}\n`);
    } catch (error) {
      assert.isNotOk('exec', 'this will fail');
    }
  });

  it('catch error in exec', async () => {
    try {
      const result = await exec(`${mqd} --not-a-param`);
      expect(result).to.equal(`${pkg.version}\n`);
    } catch (error) {
      assert.isOk('exec', 'error was caught');
    }
  });
});
