<p align="center">
  <img src="mqd.png" width="320" alt="mqd">
</p>
<h1 align="center">Markdown quick documentation</h1>
<br>

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

## Description
mqd is command line tool for quickly creating static documentation from the markdown files

## Installation

You can install the package from npm

```bash
npm i -g mqd
```

## Usage

In order to use the utility `mqd` it is enough to specify either a separate file or directory in which files with markdown markup are located:

```bash
mqd convert path/to/source/file.md path/to/destination/directory

// or

mqd convert path/to/source/directory path/to/destination/directory
```

## Configuration file

For more convenient work with the utility `mqd` you can use the file to configure your project.

The configuration file should be located in the root of the project and have the name `mqd.json`.

To automatically create a file, you need to run the command in the project's root folder:

```bash

mqd init

```

You can also pass the path to the folder where you want to initialize the configuration file:

```bash

mqd init path/to/destination/directory

```

## Tests

```bash
npm test
```

## License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/mqd.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mqd

[travis-image]: https://img.shields.io/travis/lacodda/mqd/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/lacodda/mqd

[coveralls-image]: https://img.shields.io/coveralls/lacodda/mqd/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/lacodda/mqd?branch=master