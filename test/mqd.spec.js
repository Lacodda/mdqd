const { join, resolve } = require('path');
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

  describe('load', () => {
    it('detect files without extension .js', async () => {
      try {
        mqd.commandsPath = resolve(join(__dirname, '..', 'bin'));
        expect(await mqd.load()).to.be.true;
      } catch (error) {
        assert.isNotOk('loading', 'error was caught');
      }
    });

    it('catch error in loading', async () => {
      try {
        mqd.commandsPath = './non-existent-directory';
        await mqd.load();
        assert.isNotOk('readdir', `error wasn't caught`);
      } catch (error) {
        assert.isOk('readdir', 'error was caught');
      }
    });
  });
});
