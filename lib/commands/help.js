const { resolve } = require('path');
const { platform } = require('os');
const exec = require('../../lib/util/exec');
const mqd = require('../mqd.js');
// const opener = require('opener');

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

async function openDocumentation(command) {
  const isWindows = platform() === 'win32';
  if (isWindows) {
    const htmlFile = resolve(`${__dirname}/../website/cli-${command}.html`);
    // return opener('file:///' + htmlFile);
    console.log(`file:///${htmlFile}`);
  }

  await exec(`man mqd-${command}`);
}

function help(command) {
  return new Promise((res) => {
    if (!mqd.cli[command]) {
      console.log(getGeneralHelpMessage());
    } else {
      openDocumentation(command);
    }

    res();
  });
}

exports.cli = help;
