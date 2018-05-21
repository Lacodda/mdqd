/* eslint-disable no-unused-vars */

process.env.NODE_ENV = 'test';
const pkg = require('../package.json');
const path = require('path');
const chai = require('chai');

const testTempFolder = 'tmp';

// globals
global.pkg = pkg;
global.assert = chai.assert;
global.expect = chai.expect;
global.chai = chai;
global.testPath = path.join(__dirname, testTempFolder);
global.createFilePath = name => path.join(__dirname, testTempFolder, name);
