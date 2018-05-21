const through = require('through2');
const marked = require('marked');
const PluginError = require('plugin-error');
const fs = require('fs');

const templateFile = __dirname + '/templates/template.html';
const assetsPath = __dirname + '/assets/**/*';

module.exports = options => through.obj((file, enc, cb) => {
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
      cb(new PluginError('gulp-markdown', err, { fileName: file.path }));
      return;
    }
    const template = fs.readFileSync(templateFile, 'utf8');
    const rendered = template.replace('{{ CONTENT }}', data);

    file.contents = Buffer.from(rendered);
    file.extname = '.html';

    cb(null, file);
  });
});

module.exports.marked = marked;
module.exports.assets = () => assetsPath;
