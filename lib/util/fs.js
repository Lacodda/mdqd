const { promisify } = require('util');
const {
  access, readdir, readFile, writeFile, stat
} = require('fs');
const { ensureFile } = require('fs-extra');

/**
 * async/await fs access
 * @param {*} path
 * @returns {Promise<*>}
 */
module.exports.access = async (path) => {
  try {
    return await promisify(access)(path);
  } catch (error) {
    throw error;
  }
};

/**
 * async/await fs readdir
 * @param {*} dir
 * @returns {Promise<*>}
 */
module.exports.readdir = async (dir) => {
  try {
    return await promisify(readdir)(dir);
  } catch (error) {
    throw error;
  }
};

/**
 * async/await fs readFile
 * @param {*} path
 * @param {*} options
 * @returns {Promise<*>}
 */
module.exports.readFile = async (path, options = null) => {
  try {
    return await promisify(readFile)(path, options);
  } catch (error) {
    throw error;
  }
};

/**
 * async/await fs writeFile
 * @param {*} file
 * @param {*} data
 * @param {*} options
 * @returns {Promise<*>}
 */
module.exports.writeFile = async (file, data, options = null) => {
  try {
    await ensureFile(file);
    return await promisify(writeFile)(file, data, options);
  } catch (error) {
    throw error;
  }
};

/**
 * async/await fs stat
 * @param {*} path
 * @param {*} options
 * @returns {Promise<*>}
 */
module.exports.stat = async (path) => {
  try {
    return await promisify(stat)(path);
  } catch (error) {
    throw error;
  }
};
