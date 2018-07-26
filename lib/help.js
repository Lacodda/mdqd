const path = require('path');
const isWindows = require('os').platform() === 'win32';
const spawnSync = require('child_process').spawnSync;

// const opener = require('opener');

const mqd = require('./mqd.js');


function help(command) {
  return new Promise((resolve, reject) => {
    if (!mqd.cli[command]) {
      console.log(getGeneralHelpMessage());
    } else {
      openDocumentation(command);
    }

    resolve();
  });
}

exports.cli = help;

function getGeneralHelpMessage() {
  const commands = Object.keys(mqd.cli).map(cmd => `\n    ${cmd}`);

  const message = `
  Usage: mqd <command> [options]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:
    ${commands}

  You can get more help on each command with: mqd help <command>

  Example:
  mqd help isonline

  mqd v${mqd.version} on Node.js ${process.version}`;

  return message;
}

function openDocumentation(command) {
  if (isWindows) {
    const htmlFile = path.resolve(
      __dirname + '/../website/cli-' + command + '.html'
    );
    return opener('file:///' + htmlFile);
  }

  spawnSync('man', ['mqd-' + command], { stdio: 'inherit' });
}
