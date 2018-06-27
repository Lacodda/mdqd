const path = require('path');
const convert = require('../../lib/commands/convert').api;
const exec = require('../../lib/util/exec');
const { access } = require('../../lib/util/fs');

describe('convert file when it exists', () => {
  // beforeEach(() => removeFolder(tmpPath));

  describe('api', () => {
    it('can convert', async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const tmpHtmlFile = path.join(tmpPath, 'index.html');
        const result = await convert(testMdFile, tmpHtmlFile);
        expect(testMdFile).to.equal(result);
      } catch (error) {
        assert.isNotOk('convert', error);
      }
    });
  });

  describe('cli', () => {
    it('can convert', async () => {
      try {
        const tmpPath = await createFilePath('convert');
        const tmpHtmlFile = path.join(tmpPath, 'index.html');
        const result = await exec(`./bin/mqd convert ${testMdFile} ${tmpHtmlFile}`);
        expect(`File ${testMdFile} successfully converted\n`).to.equal(result);
      } catch (error) {
        assert.isNotOk('convert', error);
      }
    });
  });
});
