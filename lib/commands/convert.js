const {
  basename, resolve, join, parse
} = require('path');
const { Converter } = require('showdown');
const { copy, ensureDir } = require('fs-extra');
const {
  access, readFile, writeFile, stat, readdir
} = require('../util/fs');
const { templatesPath } = require('../mqd');

/**
 * function for convert md file to html
 * @param {*} path
 * @param {*} targetPath
 * @param {*} toc
 */
async function convertMdtoHtml(path, targetPath, toc) {
  const templateFile = resolve(join(templatesPath, 'index.html'));
  const targetFile = resolve(join(targetPath, `${parse(path).name}.html`));
  const converter = new Converter();
  const text = await readFile(path, 'utf8');
  const template = await readFile(templateFile, 'utf8');
  const html = converter.makeHtml(text);
  const rendered = template
    .replace('{{ CONTENT }}', html)
    .replace('{{ SIDEBAR }}', toc);

  await writeFile(targetFile, rendered);
}

/**
 * function for generate table of content as html list from md files array
 * @param {*} mdFiles
 */
function getToc(mdFiles) {
  let toc = '<ul class="list-unstyled">';

  mdFiles.forEach((file) => {
    const filename = basename(file, '.md');
    toc += `<li><a href="${filename}.html">${filename}</a></li>`;
  });
  toc += '</ul>';

  return toc;
}

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
    // check if path exists
    await access(path);

    if (!targetPath) {
      throw Error('Set "target path", please.');
    }
    // create targetPath if it not exist
    await ensureDir(targetPath);

    const pathStat = await stat(path);
    let toc = '';

    if (pathStat.isDirectory()) {
      const files = await readdir(path);
      const mdFiles = files.filter(file => /\.md$/.test(file));

      if (mdFiles.length === 0) {
        throw Error(`the directory "${path}" doesn't contain markdown files`);
      } else if (mdFiles.length > 1) {
        toc = getToc(mdFiles);
      }

      mdFiles.forEach(async (file) => {
        await convertMdtoHtml(resolve(join(path, file)), targetPath, toc);
      });
    } else {
      await convertMdtoHtml(path, targetPath, toc);
    }

    const assetsSrcDir = resolve(join(templatesPath, 'assets'));
    const assetsDestDir = resolve(join(targetPath, 'assets'));
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
