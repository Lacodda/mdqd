const { resolve } = require('path');
const { access, readdir, readFile, writeFile } = require('../../lib/util/fs');

// FIXME: move to config
const fixturesInputPath = resolve(__dirname, '..', 'fixtures', 'index.md');

describe('test fs functions', () => {
  describe('access', () => {
    it('access worked', async () => {
      try {
        await access('./bin');
        assert.isOk('access', 'dir exists');
      } catch (error) {
        assert.isNotOk('access', 'error was caught');
      }
    });

    it('catch error in access', async () => {
      try {
        await access('./non-existent-directory');
        assert.isNotOk('access', `error wasn't caught`);
      } catch (error) {
        assert.isOk('access', 'error was caught');
      }
    });
  });

  describe('readdir', () => {
    it('readdir worked', async () => {
      try {
        const result = await readdir(`./bin`);
        expect(result).to.deep.equal(['mqd']);
      } catch (error) {
        assert.isNotOk('readdir', 'this will fail');
      }
    });

    it('catch error in readdir', async () => {
      try {
        const result = await readdir(`./non-existent-directory`);
        assert.isNotOk('readdir', `error wasn't caught`);
      } catch (error) {
        assert.isOk('readdir', 'error was caught');
      }
    });
  });

  describe('readFile', () => {
    it('readFile worked', async () => {
      try {
        const result = await readFile(fixturesInputPath, 'utf8');
        expect('# Test').to.equal(result);
      } catch (error) {
        assert.isNotOk('readFile', 'this will fail');
      }
    });

    it('catch error in readFile', async () => {
      try {
        const result = await readFile('./non-existent-file', 'utf8');
        assert.isNotOk('readFile', `error wasn't caught`);
      } catch (error) {
        assert.isOk('readFile', 'error was caught');
      }
    });
  });

  describe('writeFile', () => {
    it('writeFile worked', async () => {
      try {
        // TODO: add param to createFilePath function for return path without creating dirs
        const tmpPath = await createFilePath('write-file');
        await writeFile(resolve(tmpPath, 'index.md'), '# Test', 'utf8');
        assert.isOk('writeFile', 'file written');
      } catch (error) {
        assert.isNotOk('writeFile', 'error was caught');
      }
    });

    it('catch error in writeFile', async () => {
      try {
        const result = await writeFile(
          './non-existent-directory/index.md',
          '# Test',
          'utf8'
        );
        assert.isNotOk('writeFile', `error wasn't caught`);
      } catch (error) {
        assert.isOk('writeFile', 'error was caught');
      }
    });
  });
});
