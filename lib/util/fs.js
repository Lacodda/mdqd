const { promisify } = require('util');
const { readdir, access, mkdir, readFile, writeFile } = require('fs');
const { copy, remove } = require('fs-extra');

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
 * async/await fs copy recursively
 * @param {*} src
 * @param {*} dest
 * @param {*} options
 * @returns {Promise<*>}
 */
module.exports.copy = async (src, dest, options = null) => {
  try {
    return await promisify(copy)(src, dest, options);
  } catch (error) {
    throw error;
  }
};

/**
 * async/await fs remove recursively
 * @param {*} path
 * @returns {Promise<*>}
 */
module.exports.remove = async (path) => {
  try {
    return await promisify(remove)(path);
  } catch (error) {
    throw error;
  }
};

/**
 * async/await fs mkdir
 * @param {*} path
 * @returns {Promise<*>}
 */
module.exports.mkdir = async (path) => {
  try {
    return await promisify(mkdir)(path);
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
    return await promisify(writeFile)(file, data, options);
  } catch (error) {
    throw error;
  }
};
