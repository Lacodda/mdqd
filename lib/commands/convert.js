const { resolve, join } = require('path');
const { Converter } = require('showdown');
const { copy } = require('fs-extra');
const { readFile, writeFile } = require('../util/fs');
const { templatesPath } = require('../mqd');

/**
 * api convert function
 * @param {*} path
 * @param {*} targetPath
 * @returns {Promise<*>}
 */
const convert = async (path, targetPath) => {
  try {
    if (!path) {
      throw Error('Set "path", please.');
    }
    if (!targetPath) {
      throw Error('Set "target path", please.');
    }
    const templateFile = resolve(join(templatesPath, 'index.html'));
    const assetsSrcDir = resolve(join(templatesPath, 'assets'));
    const assetsDestDir = resolve(join(targetPath, 'assets'));
    const targetFile = resolve(join(targetPath, 'index.html'));
    const converter = new Converter();
    const text = await readFile(path, 'utf8');
    const template = await readFile(templateFile, 'utf8');
    const html = converter.makeHtml(text);
    const rendered = template.replace('{{ CONTENT }}', html);

    await writeFile(targetFile, rendered);
    await copy(assetsSrcDir, assetsDestDir);
    return path;
  } catch (error) {
    throw error;
  }
};

exports.api = convert;

/**
 * cli convert command
 * @param {*} path
 * @param {*} targetPath
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
