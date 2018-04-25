const glob = require('glob');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const marked = require('marked');

const versionFile = __dirname + '/version';
const srcAssetsDir = __dirname + '/docs/assets';
const destAssetsDir = __dirname + '/docs2/assets';
const templateFile = __dirname + '/docs/templates/template.html';
const sources = getSources();

function getSources() {
  const files = glob.sync('src/docs/*.md');

  return files.map(file => path.resolve(file));
}

function cleanUpWebsite() {
  fse.removeSync(__dirname + '/docs/');
  fse.ensureDirSync(__dirname + '/docs/');
}

function getTargetForWebsite(currentFile) {
  let target = currentFile;

  // set the file ending to html
  target = target.replace(/\.md$/, '.html');

  // replace the source dir with the target dir
  target = target
  .replace(['src', 'docs'].join(path.sep), 'docs');

  return target;
}

/**
 * function returns a greeting string
 * @param name
 * @returns {string}
 */
const helloFunction = (name = 'world') => `Hello ${name}!`;

/**
 * function for summing two terms
 * @param a
 * @param b
 * @returns {number}
 */
const sumFunction = (a, b) => a + b;

export default helloFunction;

export { sumFunction };


'use strict';
const through = require('through2');
const marked = require('marked');
const PluginError = require('plugin-error');
const fs = require('fs');
const templateFile = __dirname + '/template/template.html';

module.exports = options => {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new PluginError('gulp-markdown', 'Streaming not supported'));
      return;
    }

    marked(file.contents.toString(), options, (err, data) => {
      if (err) {
        cb(new PluginError('gulp-markdown', err, {fileName: file.path}));
        return;
      }
      const template = fs.readFileSync(templateFile, 'utf8');
      const rendered = template
      .replace('__CONTENT__', data);

      file.contents = Buffer.from(rendered);
      file.extname = '.html';

      cb(null, file);
    });
  });
};

module.exports.marked = marked;
