const mqd = require('../lib/mqd');

describe('test mqd functions', () => {
  beforeEach(() => {
    mqd.commands = null;
    mqd.cli = null;
    mqd.loaded = false;
  });

  describe('api', () => {
    it('catch error before loading commands', async () => {
      try {
        await mqd.commands['convert'];
        assert.isNotOk('loading commands', `error wasn't caught`);
      } catch (error) {
        assert.isOk('loading commands', 'error was caught');
      }
    });

    it('loading fulfilled', async () => {
      try {
        await mqd.load();
        expect(await mqd.commands['convert']).to.not.be.undefined;
        assert.isOk('loading commands', 'command exists');
      } catch (error) {
        assert.isNotOk('loading commands', 'error was caught');
      }
    });
  });

  describe('cli', () => {
    it('catch error before loading commands', async () => {
      try {
        await mqd.cli['convert'];
        assert.isNotOk('loading commands', `error wasn't caught`);
      } catch (error) {
        assert.isOk('loading commands', 'error was caught');
      }
    });

    it('loading fulfilled', async () => {
      try {
        await mqd.load();
        expect(await mqd.cli['convert']).to.not.be.undefined;
        assert.isOk('loading commands', 'command exists');
      } catch (error) {
        assert.isNotOk('loading commands', 'error was caught');
      }
    });
  });
});
