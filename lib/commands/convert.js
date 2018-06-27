const { Converter } = require('showdown');
const { readFile, writeFile } = require('../util/fs');

/**
 * api convert function
 * @param path
 * @param targetPath
 * @returns {Promise<*>}
 */
const convert = async (path, targetPath) => {
  try {
    if (!path) {
      throw Error('set "path" please');
    }
    if (!targetPath) {
      throw Error('set "target path" please');
    }
    const converter = new Converter();
    const text = await readFile(path, 'utf8');
    const html = converter.makeHtml(text);
    await writeFile(targetPath, html);
    return path;
  } catch (error) {
    throw error;
  }
};

exports.api = convert;

/**
 * cli convert command
 * @param path
 * @param targetPath
 * @returns {Promise<void>}
 */
const cli = async (path, targetPath) => {
  try {
    const results = await convert(path, targetPath);
    console.log(`File ${results} successfully converted`);
  } catch (error) {
    throw error;
  }
};

exports.cli = cli;
