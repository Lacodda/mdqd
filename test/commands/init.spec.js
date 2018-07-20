const { resolve } = require('path');
const { remove, ensureDir } = require('fs-extra');
const init = require('../../lib/commands/init').api;
const exec = require('../../lib/util/exec');
const { readFile, writeFile } = require('../../lib/util/fs');

describe('init mqd.json file', () => {
  beforeEach(async () => await remove(tmpPath));

  describe('api', () => {
    it('can init', async () => {
      try {
        const tmpPath = getTmpPath('init');
        await ensureDir(tmpPath);
        // create test md file
        await writeFile(resolve(tmpPath, 'index.md'), '# Test', 'utf8');

        const result = await init(tmpPath);
        expect(`${tmpPath}/mqd.json`).to.equal(result);
      } catch (error) {
        assert.isNotOk('init', error);
      }
    });
  });

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
