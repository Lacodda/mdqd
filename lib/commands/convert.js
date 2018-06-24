const path = require('path');
const showdown = require('showdown');
const clone = require('../util/clone');
const { remove } = require('../util/fs');

const converter = new showdown.Converter();
const text = '# hello, markdown!';
const html = converter.makeHtml(text);

/**
 * api convert function
 * @param repo
 * @param targetPath
 * @returns {Promise<*>}
 */
const convert = async (repo, targetPath) => {
  try {
    const results = await clone(repo, targetPath);
    await remove(path.join(targetPath, '.git'));
    return results;
  } catch (error) {
    throw error;
  }
};

exports.api = convert;

/**
 * cli convert command
 * @param repo
 * @param targetPath
 * @returns {Promise<void>}
 */
const cli = async (repo, targetPath) => {
  try {
    const results = await convert(repo, targetPath);
    console.log(`Repository ${results} successfully converted`);
  } catch (error) {
    throw error;
  }
};

exports.cli = cli;
