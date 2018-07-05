const { resolve } = require('path');
const convert = require('../../lib/commands/convert').api;
const exec = require('../../lib/util/exec');
const { access, readFile } = require('../../lib/util/fs');

// FIXME: move to config
const fixturesInputPath = resolve(__dirname, '..', 'fixtures', 'index.md');
const fixturesOutputPath = resolve(__dirname, '..', 'fixtures', 'output.html');
const fixturesEmptyDirPath = resolve(__dirname, '..', 'fixtures', 'empty-dir');
const outputFile = resolve(__dirname, '..', 'tmp', 'convert', 'index.html');

describe('convert file when it exists', () => {
  // FIXME: return directory clearing
  // beforeEach(() => removeFolder(tmpPath));

  describe('api', () => {
    it('can convert', async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const result = await convert(testMdFile, tmpPath);
        expect(testMdFile).to.equal(result);
      } catch (error) {
        assert.isNotOk('convert', error);
      }
    });

    it('conformity test', async () => {
      try {
        // FIXME: add a separate file generation
        const fixtureFile = await readFile(fixturesOutputPath, 'utf-8');
        const tmpFile = await readFile(outputFile, 'utf-8');

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
        const tmpPath = await createFilePath('convert');
        const result = await convert('./non-existent-file.md', tmpPath);
        assert.isNotOk('convert', `error wasn't caught`);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });

    it('catch error, not specified source directory', async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const result = await convert();
        expect('Set "path", please.').to.equal(result);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });

    it("catch error, directory doesn't contain markdown files", async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const result = await convert(fixturesEmptyDirPath, tmpPath);
        assert.isNotOk('convert', `error wasn't caught`);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });

    it('catch error, not specified destination directory', async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const result = await convert(testMdFile);
        expect('Set "target path", please.').to.equal(result);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });
  });

  describe('cli', () => {
    it('can convert', async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const result = await exec(
          `node ./bin/mqd convert ${testMdFile} ${tmpPath}`
        );
        expect(`File ${testMdFile} successfully converted\n`).to.equal(result);
      } catch (error) {
        assert.isNotOk('convert', error);
      }
    });

    it('catch error, not specified source directory', async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const result = await exec(`node ./bin/mqd convert`);
        expect('Set "path", please.').to.equal(result);
      } catch (error) {
        assert.isOk('convert', 'error was caught');
      }
    });
  });
});
