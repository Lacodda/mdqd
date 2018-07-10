/* eslint-disable no-unused-vars */

process.env.NODE_ENV = 'test';
const pkg = require('../package.json');
const { join, resolve } = require('path');
const chai = require('chai');
const { remove, ensureDir } = require('fs-extra');

const tmpDir = 'tmp';
const fixturesDir = 'fixtures';

// globals
global.pkg = pkg;
global.assert = chai.assert;
global.expect = chai.expect;
global.chai = chai;
global.mqd = './bin/mqd';
global.tmpPath = resolve(join(__dirname, tmpDir));
global.fixturesPath = resolve(join(__dirname, fixturesDir));
global.testMdFile = join(fixturesPath, 'index.md');
global.fixturesInputSourcePath = join(fixturesPath, 'source');
global.fixturesOutputPath = join(fixturesPath, 'output.html');
global.fixturesEmptyDirPath = join(fixturesPath, 'empty-dir');

global.getTmpPath = (name) => resolve(join(tmpPath, name));