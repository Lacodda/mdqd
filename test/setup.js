/* eslint-disable no-unused-vars */

process.env.NODE_ENV = 'test';
const pkg = require('../package.json');
const path = require('path');
const chai = require('chai');
const { remove, ensureDir } = require('fs-extra');
const { mkdir } = require('../lib/util/fs');

const testTempFolder = 'tmp';

// globals
global.pkg = pkg;
global.assert = chai.assert;
global.expect = chai.expect;
global.chai = chai;
global.mqd = './bin/mqd';
global.testPath = path.join(__dirname, testTempFolder);
global.createFilePath = async name => {
  const filePath = path.join(__dirname, testTempFolder, name);
  await ensureDir(filePath);
  return filePath;
};
global.removeFolder = name => remove(name).catch(err => {
  console.log(err);
  throw err;
});
global.testMdFile = path.join(__dirname, 'fixtures', 'index.md');