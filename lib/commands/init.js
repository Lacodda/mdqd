const { basename, resolve } = require('path');
const { ensureDir, pathExists, outputJson } = require('fs-extra');
const { readdir } = require('../util/fs');

exports.command = 'init [targetPath]';
exports.desc = 'Create configuration file mqd.json';
exports.builder = {
  targetPath: {
    default: '.'
  }
};
/**
 * cli init command
 * @param {*} argv
 */
exports.handler = async (argv) => {
  try {
    const results = await init(argv.targetPath);
    console.log(`File ${results} successfully initialized`);
  } catch (error) {
    throw error;
  }
};

/**
 * function to get an array of md-files from the transmitted path
 * @param {*} path
 */
async function getMdFiles(path) {
  // console.log(path);
  const files = await readdir(path);
  // console.log(files);
  const mdFiles = files.filter((file) => /\.md$/.test(file));

  return mdFiles.map((file) => {
    const name = basename(file, '.md');

    return { file, name };
  });
}

/**
 * api init function
 * @param {*} targetPath
 * @returns {Promise<*>}
 */
const init = async (targetPath = '') => {
  try {
    const path = resolve(targetPath);
    // create targetPath if it not exist
    await ensureDir(path);

    const mqdPath = resolve(path, 'mqd.json');

    // if (await pathExists(mqdPath)) {

    // }

    await outputJson(
      mqdPath,
      { menu: await getMdFiles(path) },
      { spaces: '  ' }
    );

    return mqdPath;
  } catch (error) {
    throw error;
  }
};

exports.api = init;

/**
 * cli init command
 * @param {*} targetPath
 * @returns {Promise<void>}
 */
const cli = async (targetPath) => {
  try {
    const results = await init(targetPath);
    console.log(`File ${results} successfully initialized`);
  } catch (error) {
    throw error;
  }
};

exports.cli = cli;
