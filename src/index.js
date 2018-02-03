import Input from './input';
import Renderer from './renderer';

/**
 * Default options
 */
const defaultOptions = {
  outputStream: process.stdout,
  inputStream: process.stdin,
  values: [],
  defaultValue: 0,
  selected: '(x)',
  unselected: '( )',
  indentation: 0,
  cleanup: true,
  valueRenderer: (value) => value,
};

/**
 * Open the input with a normal callback function
 *
 * @param {Input} input - input object
 * @param {function} callback - callback function
 */
const withCallback = (input, callback) => {
  input.open();
  input.onSelect((id, value) => callback({id, value}));
};

/**
 * Open the input with a promise
 *
 * @param {Input} input - input object
 */
const withPromise = (input) => {
  return new Promise((resolve, reject) => {
    input.open();
    input.onSelect((id, value) => {
      if (id === null) {
        reject();
      } else {
        resolve({id, value});
      }
    });
  });
};

/**
 * Create an instance of cli-select with the given options
 *
 * @param {object} options - options for cli-select
 * @param {function} callback - if specified, a callback will be used, otherwise a promise gets returned (optional)
 */
const creator = (options, callback) => {
  // merge options with default options
  options = {
    ...defaultOptions,
    ...options,
  };

  // create renderer and input instances
  const renderer = new Renderer(options, options.outputStream);
  const input = new Input(options.inputStream);
  input.setValues(options.values);
  input.setDefaultValue(options.defaultValue);
  input.attachRenderer(renderer);

  // handle different callback methods
  if (typeof callback === 'function') {
    return withCallback(input, callback);
  } else {
    return withPromise(input);
  }
};

module.exports = creator;
export default creator;
