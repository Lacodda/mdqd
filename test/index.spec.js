const Vinyl = require('vinyl');
const { resolve } = require('path');
const fs = require('fs');
const assert = require('assert');
const m = require('../src');

const fixturesInputPath = resolve(__dirname, 'fixtures', 'index.md');
const fixturesOutputPath = resolve(__dirname, 'fixtures', 'output.html');

it('default test', (done) => {
  const stream = m();

  stream.on('data', (file) => {
    const fixtures = fs.readFileSync(fixturesOutputPath, 'utf-8');
    assert.equal(file.contents.toString().replace(/[\n ]/g, ''), fixtures.replace(/[\n ]/g, ''));
    done();
  });

  stream.write(new Vinyl({
    path: 'index.md',
    contents: fs.readFileSync(fixturesInputPath),
  }));

  stream.end();
});
