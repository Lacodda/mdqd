const { resolve } = require('path');
const { remove } = require('fs-extra');
const init = require('../../lib/commands/init').api;
const exec = require('../../lib/util/exec');
const { readFile } = require('../../lib/util/fs');

describe('init mqd.json file', () => {
  beforeEach(async () => await remove(tmpPath));

  describe('cli', () => {
    it('can init', async () => {
      try {
        const tmpPath = getTmpPath('init');
        const result = await exec(`node ./bin/mqd init ${tmpPath}`);
        expect(`File ${tmpPath}/mqd.json successfully inited\n`).to.equal(
          result
        );
      } catch (error) {
        assert.isNotOk('init', error);
      }
    });

    it('catch error, when the incorrect path is specified', async () => {
      try {
        await exec(`node ./bin/mqd init package.json`);
        assert.isNotOk('init', `error wasn't caught`);
      } catch (error) {
        assert.isOk('init', 'error was caught');
      }
    });
  });
});
