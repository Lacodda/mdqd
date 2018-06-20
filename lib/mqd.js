const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const { readdir } = require('./util/fs');

const mqd = {
  loaded: false,
  version: pkg.version,
};

const api = {};
const cli = {};

const commandsPath = path.resolve(path.join(__dirname, 'commands'));

Object.defineProperty(mqd, 'commands', {
  get: () => {
    if (mqd.loaded === false) {
      throw new Error('run mqd.load before');
    }
    return api;
  },
});

Object.defineProperty(mqd, 'cli', {
  get: () => {
    if (mqd.loaded === false) {
      throw new Error('run mqd.load before');
    }
    return cli;
  },
});

/**
 * function for loading commands
 * @returns {Promise<boolean>}
 */
mqd.load = async () => {
  try {
    const files = await readdir(commandsPath);
    files.forEach((file) => {
      if (!/\.js$/.test(file)) {
        return;
      }

      const cmd = file.match(/(.*)\.js$/)[1];
      const mod = require(path.join(commandsPath, file));

      if (mod.cli) {
        cli[cmd] = mod.cli;
      }
      if (mod.api) {
        api[cmd] = mod.api;
      }
    });
    mqd.loaded = true;
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = mqd;
