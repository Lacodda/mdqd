const { resolve } = require('path');
const { remove } = require('fs-extra');
const convert = require('../../lib/commands/convert').api;
const exec = require('../../lib/util/exec');
const { readFile } = require('../../lib/util/fs');

describe('convert file when it exists', () => {
  beforeEach(async () => await remove(tmpPath));

  describe('api', () => {
    it('can convert', async () => {
      try {
        const tmpPath = getTmpPath('convert');
        const result = await convert(testMdFile, tmpPath);
        expect(testMdFile).to.equal(result);
      } catch (error) {
        assert.isNotOk('convert', error);
      }
    });

    it('can convert', async () => {
      try {
        const tmpPath = getTmpPath('convert');
        const result = await convert(fixturesInputSourcePath, tmpPath);
        expect(fixturesInputSourcePath).to.equal(result);
      } catch (error) {
        assert.isNotOk('convert', error);
      }
    });

    it('conformity test', async () => {
      try {
        const tmpPath = getTmpPath('convert');
        await convert(testMdFile, tmpPath);
        const fixtureFile = await readFile(fixturesOutputPath, 'utf-8');
        const tmpFile = await readFile(resolve(tmpPath, 'index.html'), 'utf-8');

        assert.equal(
          tmpFile.replace(/[\r\n|\r|\n ]/g, ''),
          fixtureFile.replace(/[\r\n|\r|\n ]/g, '')
        );
      } catch (error) {
        assert.isNotOk('conformity', error);
      }
    });

    it('catch error, not existant source file', async () => {
      try {
        const tmpPath = getTmpPath('convert');
        await convert('./non-existent-file.md', tmpPath);
        assert.isNotOk('convert', `error wasn't caught`);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });

    it('catch error, not specified source directory', async () => {
      try {
        await convert();
        assert.isNotOk('convert', `error wasn't caught`);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });

    it("catch error, directory doesn't contain markdown files", async () => {
      try {
        const tmpPath = getTmpPath('convert');
        await convert(fixturesEmptyDirPath, tmpPath);
        assert.isNotOk('convert', `error wasn't caught`);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });

    it('catch error, not specified destination directory', async () => {
      try {
        const result = await convert(testMdFile);
        assert.isNotOk('convert', `error wasn't caught`);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });
  });

  describe('cli', () => {
    it('can convert', async () => {
      try {
        const tmpPath = getTmpPath('convert');
        const result = await exec(
          `${bin} convert ${testMdFile} ${tmpPath}`
        );
        expect(`File ${testMdFile} successfully converted\n`).to.equal(result);
      } catch (error) {
        assert.isNotOk('convert', error);
      }
    });

    it('catch error, not specified source directory', async () => {
      try {
        await exec(`${bin} convert`);
        assert.isNotOk('convert', `error wasn't caught`);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });
  });
});
